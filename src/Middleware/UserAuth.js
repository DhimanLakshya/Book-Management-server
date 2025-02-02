const { ValidAadhaar, ValidName, Validemail, Validpass } = require('../validation/validation')

exports.userAuthData = async (req, res, next) => {
   try {
      const data = req.body

      const { Email, password, First_Name, Last_Name, Address, Aadhaar_no, Institute_Name, gender, dob } = data;



      if (!First_Name) return res.status(400).send({ status: false, msg: 'Pls Provided First_Name' })
      if (!ValidName(First_Name)) return res.status(400).send({ status: false, msg: 'Pls Provided Valid first Name' })

      if (!Last_Name) return res.status(400).send({ status: false, msg: 'Pls Provided Last_Name' })
      if (!ValidName(Last_Name)) return res.status(400).send({ status: false, msg: 'Pls Provided Valid last Name' })

      if (!Email) return res.status(400).send({ status: false, msg: 'Pls Provided Email' })
      if (!Validemail(Email)) return res.status(400).send({ status: false, msg: 'Pls Provided Valid Email' })

      if (!password) return res.status(400).send({ status: false, msg: 'Pls Provided password' })
      if (!Validpass(password)) return res.status(400).send({ status: false, msg: 'Pls Provided Valid Paasword' })

      if (!Address) return res.status(400).send({ status: false, msg: 'Pls Provided Address' })

      if (!Aadhaar_no) return res.status(400).send({ status: false, msg: 'Pls Provided Aadhaar_no' })
      if (!ValidAadhaar(Aadhaar_no)) return res.status(400).send({ status: false, msg: 'Pls Provided Valid Aadhaar_no' })

      if (!Institute_Name) return res.status(400).send({ status: false, msg: 'Pls Provided Address' })

      if (!dob) return res.status(400).send({ status: false, msg: 'Pls Provided dob' })

      next()
   }
   catch (e) { return status(500).send({ status: false, msg: e.message }) }
}