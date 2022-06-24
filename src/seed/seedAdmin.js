const crypto = require("crypto-js");
const { Admin } = require('../models');



exports.createAdmin = async () => {
    const username = process.env.DEFAULT_ADMIN_USERNAME
    const password = process.env.DEFAULT_ADMIN_PASSWORD
    try {
        const admin = await Admin.findOne({username: username})
        if (admin !== null) {
            return true;
        }
        const newAdmin = new Admin({
            username: username,
            password: crypto.AES.encrypt(password, process.env.PASSWORD_SECRET_KEY)
        })
        
        await newAdmin.save();

        console.log(username);
        console.log(password);
        
        
    } catch (error) {
        return false
    }
}