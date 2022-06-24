const mongoose = require('mongoose');
const { schemaOptions } = require('./modelOptions');

const userPlaceSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    place: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Place',
        required: true
    }
}, schemaOptions);

module.exports = mongoose.model('UserPlace', userPlaceSchema);