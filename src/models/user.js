const mongoose = require('mongoose');
const { schemaOptions } = require('./modelOptions');

const userSchema = new mongoose.Schema({
    idNumber: {
        type: String,
        required: true,
        unique: true
    },
    phoneNumber: {
        type: String,
        required: true
    },
    fullname: {
        type: String,
        required: true
    },
    address: {
        type: String
    }
}, schemaOptions);

module.exports = mongoose.model('User', userSchema);