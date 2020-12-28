const { Schema, model } = require('mongoose');

const deviceSchema = new Schema({
    serial: {
        type: Number,
        unique: true,
        required: true
    },
    tag: {
        type: String,
        unique: true,
        required: true
    },
    modbus: {
        type: Number,
        unique: true,
        required: true
    },
    frec: {
        type: Number,
        required: true
    },
    unit: {
        type: String,
        required: true
    }
},
{
    versionKey: false
});

module.exports = model('Device', deviceSchema)