const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    firstname: {
        type: String,
        required: true,
    },
    lastname: {
        type: String,
        required: true,
    },
    username: {
        type: String,
        unique: true,
    },
    bio: {
        type: String,
        default: '',
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
    },
    password: {
        type: String,
        required: true,
        minlength: 8
    },
    verified: {
        type: Boolean,
        required: true,
        default: false
    },
    image: {
        type: Buffer,
        default: null,
    },
}, {
    timestamps: true
}); 

module.exports = mongoose.model('User', userSchema);