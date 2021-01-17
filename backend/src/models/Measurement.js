const { Schema, model } = require('mongoose');

const measurementSchema = new Schema({
    date: Date,
    tag: String,
    val: Number,
    unit: String
});

module.exports = model('Measurement', measurementSchema)