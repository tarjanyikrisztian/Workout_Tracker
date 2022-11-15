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
    weight: [{
        type: Number,
        required: true,
    }],
    weightDate: [{
        type: Date,
        required: true,
    }],
    height: {
        type: Number,
        required: true,
    },
    age: {
        type: Number,
        required: true,
    },
}, {
    timestamps: true
}); 

module.exports = mongoose.model('User', userSchema);