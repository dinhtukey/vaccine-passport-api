const mongoose = require('mongoose');
const { schemaOptions } = require('./modelOptions');

const vaccineLotSchema = new mongoose.Schema({
    vaccine: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Vaccine',
        required: true
    },
    name: {
        type: String,
        required: true,
        unique: true
    },
    quantity: {
        type: Number,
        required: true
    },
    vaccinated: {
        type: Number,
        required: true,
        default: 0
    }
}, schemaOptions);

module.exports = mongoose.model('VaccineLot', vaccineLotSchema);