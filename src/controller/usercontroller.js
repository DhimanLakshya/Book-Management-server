const { errorhandle } = require('../errorhandling/errorhandling');
const UserModel = require('../models/usermodel');
const jwt = require('jsonwebtoken');
const { OTPSender, ResetOTP } = require('../nodemailer/mailSender')
const bcrypt = require('bcrypt');
const usermodel = require('../models/usermodel');
require('dotenv').config()

module.exports.createuser = async (req, res) => {
   try {
      const data = req.body
      const { email, name,password } = data
      if(Object.keys(data).length==0) return res.status(400).send({ status: false, msg: 'can not send Empty body pls Provided User Data' })
      if(!password) return res.status(400).send({ status: false, msg: 'Pls Provided password' })

      let randomOtp = Math.floor(1000 + Math.random() * 9000);
      data.userotp = randomOtp

      const existingUser = await UserModel.findOneAndUpdate(
         { email: data.email },
         { $set: { userotp: randomOtp } }
      );
      if (existingUser) {
         if (existingUser.isverify == true) { return res.status(200).send({ status: false, msg: ' Already verified User Please login' }) }
         
         OTPSender(email, name, randomOtp)
         return res.status(200).send({ status: true, msg: "Successfully Otp Send", id: existingUser._id })
         
      }
      
      const BcryptPass = await bcrypt.hash(data.password, 10);
      data.password = BcryptPass;
      data.role = 'User'

      const address = {
         street: data.street,
         city: data.city,
         pincode: data.pincode
      }

      req.body.address = address

      //creating data into database
      const createdUser = await UserModel.create(data)
      OTPSender(email, data.name, randomOtp)

      // console.log(data);//printing datarecieved from postman

      return res.status(201).send({ status: true, msg: 'Sucessfully created user', id: createdUser._id });
   }
   catch (err) { return errorhandle(err, res) }

}

module.exports.otpverification = async (req, res) => {
   try {
      const id = req.params.userid;
      const otp = req.body.OTP;

      const checkuser = await UserModel.findById({ _id: id })

      if (!checkuser) { return res.status(400).send({ status: false, msg: 'user not found Please Signup' }) }
      if (!otp) { return res.status(400).send({ status: false, msg: 'Please provide OTP' }) }

      if (checkuser.isverify == "true") { return res.status(400).send({ status: false, msg: 'User Already Verify pls Log-In' }) }
      if (!(otp == checkuser.userotp)) { return res.status(400).send({ status: false, msg: 'Incorrect OTP' }) }

      await UserModel.findByIdAndUpdate({ _id: id }, { $set: { isverify: true } })
      res.status(200).send({ status: true, msg: 'OTP verified Sucessfully ' })
   }
   catch (err) { return errorhandle(err, res) }
}

module.exports.LoginUser = async (req, res) => {
   try {
      const data = req.body
      // console.log(data);
      if (data.password == undefined) { return res.status(400).send({ status: false, msg: 'Please Provide Password' }) }
      if (data.email == undefined) { return res.status(400).send({ status: false, msg: 'Please Provide Email' }) }

      const checkMailId = await usermodel.findOne({ email: data.email, role: 'User', isverify: true })

      if (!checkMailId) { return res.status(400).send({ status: false, msg: 'User Not Found,Please Signup and Verify Otp' }) }

      const BcryptPass = await bcrypt.compare(data.password, checkMailId.password)

      if (!BcryptPass) { return res.status(400).send({ status: false, msg: 'Wrong Password' }) }

      const CustomerId = checkMailId._id.toString();

      const userToken = jwt.sign({ Userid: CustomerId, Username: checkMailId.name }, process.env.UserTokenKey, { expiresIn: '12h' })

      return res.status(200).send({ status: true, msg: "Sucessfully Created Token", UserId: CustomerId, Token: userToken })
   }
   catch (err) { return errorhandle(err, res) }
}

exports.ResetPassword = async (req, res) => {
   try {
      const email = req.body.email;

      let randomOtp = Math.floor(1000 + Math.random() * 9000);
      req.body.resetotp = randomOtp;

      const CheckEmailId = await UserModel.findOneAndUpdate(
         { email: email },
         { $set: { resetotp: randomOtp } }
      );
      if (!CheckEmailId) { return res.status(404).send({ status: false, msg: 'User not found pls SignUp' }) }

      if (CheckEmailId) {
         if ((CheckEmailId.isverify) == 'true') { return res.status(200).send({ status: false, msg: ' Already verified User Please login' }) }
      }
      const name = CheckEmailId.name
         ResetOTP(email, name, randomOtp)
         const resetpass = jwt.sign({ Userid: CheckEmailId._id,data:CheckEmailId}, process.env.resetPassTokenKey, { expiresIn: '5m' })

         return res.status(200).send({ status: true, msg: "Successfully Otp Send",id:CheckEmailId._id, token : resetpass })

      }
      catch (err) { return errorhandle(err, res) }
}

exports.getAllUserData = async(req,res)=>{
   try{

      const data = await UserModel.find()

      return res.status(200).send({ status: true, msg: "Successfully Otp Send",data:data })

   }
   catch (err) { return errorhandle(err, res) }

}