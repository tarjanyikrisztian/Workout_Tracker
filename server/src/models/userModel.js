const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        minlength: 4
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
    excercises: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Exercise'
    }]
}, {
    timestamps: true
}); 

module.exports = mongoose.model('User', userSchema);