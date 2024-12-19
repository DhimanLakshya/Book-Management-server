const express=require('express');
const router=express.Router()
const multer=require('multer')
const {createuser,otpverification,LoginUser,ResetPassword}=require('../controller/usercontroller');

const upload = multer({ storage: multer.diskStorage({}), })

//user
router.post('/RegisterUser', upload.single(),createuser)
router.post('/LoginUser', upload.single(),LoginUser)
router.post('/otpVerification/:userid', upload.single(),otpverification)
router.post('/ResetPassword', upload.single(),ResetPassword)



module.exports=router;