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
    timestamps: true
});

module.exports = mongoose.model('Workout', workoutSchema);
