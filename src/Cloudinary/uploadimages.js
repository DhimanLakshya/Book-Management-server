const cloudinary = require("cloudinary").v2;
require("dotenv").config()

cloudinary.config({
    cloud_name: process.env.Cloudname,
    api_key: process.env.APIkey,
    api_secret: process.env.APIsecret
});

exports.userprofileimg = async (img) => {
    const uploadresult = await cloudinary.uploader.upload(img)
        .catch((e) => {
            console.log(e);
        });
    const url = uploadresult.secure_url;

    return url;
}