const mongoose = require('mongoose');
const { Validphone, ValidAadhaar, ValidName, Validemail, Validpass } = require('../validation/validation')
const userSchema = new mongoose.Schema({
    profileimg:{type:String,trim:true,required:false},
    First_Name: {
        type: String, required: [true, 'please provide First Name'],
        validate: [ValidName, 'Invalid Name'], trim: true
    },
    Last_Name: {
        type: String, required: [true, 'please provide Last Name'],
        validate: [ValidName, 'Invalid Name'], trim: true
    },
    
    Email: {
        type: String, required: [true, 'please provide email'],
        validate: [Validemail, 'Invalid email'], unique: true, trim: true
    },
    password: {
        type: String, required: [true, 'please provide password'],
        validate: [Validpass, 'Invalid password'], unique: true, trim: true
    },
    gender: {
        type:String,
        enum: ["Male", "Female", "Other"],
        required: true,
        trim: true
    },
    userotp: { type: String, required: false, trim: true },
    resetotp: { type: String, required: false, trim: true },
    Address: {type: String, required: [true, 'please enter your Adderss'],trim: true},
    Institute_Name: { type: String, required: [true, 'please enter your Instiyute name'], trim: true },
    isverify: { type: String, default: false, trim: true },
    isdeleted: { type: String, required: false, trim: true },
}, { timestamp: true })
module.exports = mongoose.model('User', userSchema)


