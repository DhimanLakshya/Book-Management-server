const express = require('express');
const router = express.Router()
const multer = require('multer')
const { createuser, otpverification, LoginUser, ResetPassword,getAllUserData} = require('../controller/usercontroller');
const { userAuthData } = require('../Middleware/UserAuth')

const upload = multer({ storage: multer.diskStorage({}), })

//user
router.post('/RegisterUser', upload.single("profileimg"), createuser)
router.post('/LoginUser', upload.single(), LoginUser)
router.post('/otpVerification/:userid', upload.single(), otpverification)
router.post('/ResetPassword', upload.single(), ResetPassword)
router.get('/getAllUserData', getAllUserData)




module.exports = router;