const mongoose = require('mongoose');

const workoutSchema = new mongoose.Schema({
    workoutname: {
        type: String,
        required: true,
        trim: true,
    },
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
    exercises: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'ExerciseInWorkout',
        default: []
    }],
    likes: {
        type: Number,
        default: 0
    },
}, {
    timestamps: true
});

module.exports = mongoose.model('Workout', workoutSchema);
