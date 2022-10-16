const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        minlength: 3
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
    likedExcercises: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Exercise'
    }],
    verified: {
        type: Boolean,
        required: true,
        default: false
    },
}, {
    timestamps: true
}); 

module.exports = mongoose.model('User', userSchema);