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
    likes: {
        type: Number,
        default: 0
    },

}, {
    timestamps: true
});

module.exports = mongoose.model('Exercise', exerciseSchema);