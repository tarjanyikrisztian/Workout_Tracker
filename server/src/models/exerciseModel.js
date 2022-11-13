const mongoose = require('mongoose');

const exerciseSchema = new mongoose.Schema({
    exercisename: {
        type: String,
        required: true,
        trim: true,
    },
    bodypart: [{
        type: String,
        required: true,
        trim: true,
    }],
    description: {
        type: String,
        trim: true,
    },
    ispublic: {
        type: Boolean,
        required: true,
        default: false
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    likedBy: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        default: []
    }],
    image: {
        type: Buffer,
        default: null,
    },
}, {
    timestamps: true
});

module.exports = mongoose.model('Exercise', exerciseSchema);