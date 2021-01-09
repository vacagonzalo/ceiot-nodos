const { Schema, model } = require('mongoose');

const logSchema = new Schema(
    {
        timestamp: {
            type: Date,
            unique: false,
            required: true
        },
        method: {
            type: String,
            unique: false,
            required: true
        },
        endpoint: {
            type: String,
            unique: false,
            required: true
        },
        user: {
            type: String,
            unique: false,
            required: true
        },
        body: {
            type: String,
            unique: false,
            required: true
        }
    },
    {
        versionKey: false
    }
);

module.exports = model('Log', logSchema);