const mongoose = require('mongoose');
const { schemaOptions } = require('./modelOptions');

const userVaccineSchema = new mongoose.Schema({
    vaccine: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Vaccine',
        required: true
    },
    vaccineLot: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'VaccineLot',
        required: true
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }
}, schemaOptions);

module.exports = mongoose.model('UserVaccine', userVaccineSchema);