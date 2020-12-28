const { Schema, model } = require('mongoose');

const userSchema = new Schema({
    name: {
        type: String,
        unique: true,
        required: true
    },
    email: {
        type: String,
        unique: true,
        required: true
    },
    password: {
        type: String,
        unique: false,
        required:true
    },
    rank: {
        type: Number,
        unique: false,
        required: true
    }
});

module.exports = model('User', userSchema)