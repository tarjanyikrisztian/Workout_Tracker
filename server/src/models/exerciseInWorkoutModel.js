const mongoose = require('mongoose');

const exerciseInWorkoutSchema = new mongoose.Schema({
    exercise: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Exercise'
    },
    workout: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Workout'
    },
    sets: {
        type: Number,
        default: 0
    },
    reps: {
        type: Number,
        default: 0
    },
    weight: {
        type: Number,
        default: 0
    },
    intensity: {
        type: Number,
        default: 0
    },
    notes: {
        type: String,
        trim: true,
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('ExerciseInWorkout', exerciseInWorkoutSchema);
