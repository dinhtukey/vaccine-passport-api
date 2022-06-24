const mongoose = require('mongoose');
const { schemaOptions } = require('./modelOptions');

const placeSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    creator: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }
}, schemaOptions);

module.exports = mongoose.model('Place', placeSchema);