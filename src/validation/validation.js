module.exports.Validphone=(phone)=>{
    const phoneRegex=/^[9]\d{9}$/;
    return phoneRegex.test(phone)
}
module.exports.ValidAadhaar=(aadhar)=>{
    const aadharRegex=/^[1-9]\d{11}$/;
    return aadharRegex.test(aadhar)
}
module.exports.ValidName = (Name)=>{
    const nameRegex = /^([a-zA-Z])+$/;
    return nameRegex.test(Name)
}

module.exports.Validemail = (email)=>{
    const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    return emailRegex.test(email)
}

module.exports.Validpass = (pass)=>{
    const passwordRegex = /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,}$/;
    console.log('hi',passwordRegex.test(pass));
    return passwordRegex.test(pass)
}