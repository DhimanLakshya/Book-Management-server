const mongoose = require('mongoose');
const { Validphone, ValidAadhaar, ValidName, Validemail, Validpass } = require('../validation/validation')
const userSchema = new mongoose.Schema({
 
    First_Name: {
        type: String, required: [true, 'please provide First Name'],
        validate: [ValidName, 'Invalid Name'], trim: true
    },
    Last_Name: {
        type: String, required: [true, 'please provide Last Name'],
        validate: [ValidName, 'Invalid Name'], trim: true
    },
    // phone: {
    //     type: Number, required: [true, 'please provide Phone No.'],
    //     validate: [Validphone, 'Invalid phone no'], unique: true, trim: true
    // },
    Email: {
        type: String, required: [true, 'please provide email'],
        validate: [Validemail, 'Invalid email'], unique: true, trim: true
    },
    password: {
        type: String, required: [true, 'please provide Password'],
        validate: [Validpass, 'Invalid Password'], trim: true
    },
    dob: { type: String, required: [true, 'please enter your Date of birth'], trim: true },
    Aadhaar_no: { type: String, required: [true, 'please enter your Aadhaar no.'], trim: true },
    role: {
        type: String,
        enum: ["Admin", "Author", "User"],
        required: true,
        trim: true
    },
    gender: {
        type: String,
        enum: ["Male", "Women", "Other"],
        required: true,
        trim: true
    },
    userotp: { type: String, required: false, trim: true },
    resetotp: { type: String, required: false, trim: true },
    Address: { type: String, required: [true, 'please enter your Adderss'], trim: true },
    Institute_Name: { type: String, required: [true, 'please enter your Adderss'], trim: true },
    isverify: { type: String, default: false, trim: true },
    isdeleted: { type: String, required: false, trim: true },
}, { timestamp: true })
module.exports = mongoose.model('User', userSchema)


