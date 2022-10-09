const asyncHandler = require('express-async-handler');
const Exercise = require('../models/exerciseModel');
const User = require('../models/userModel');

const getExercises = asyncHandler(async (req, res) => {
    //const exercisesByUser = await Exercise.find({user: req.user._id});
    const exercisesPublic = await Exercise.find({ispublic: true});
    //const exercises = [...exercisesByUser, ...exercisesPublic].filter((exercise, index, self) => index === self.findIndex((t) => (t.id === exercise.id)));
    res.json(exercisesPublic);
});

const createExercise = asyncHandler(async (req, res) => {
    const {exercisename, bodypart, description, ispublic} = req.body;
    const user = req.user;
    if(!exercisename || !bodypart) {
        res.status(400);
        throw new Error('Please fill all fields');
    }
    const exerciseExistsPublic = await Exercise.findOne({exercisename, ispublic: true});
    const exerciseExistBySameUser = await Exercise.findOne({exercisename, user});
    if(exerciseExistsPublic || exerciseExistBySameUser) {
        res.status(400);
        throw new Error('This excercise already exists');
    }
    const exercise = await Exercise.create({
        exercisename,
        bodypart,
        description,
        ispublic,
        user,
})
    if(!exercise) {
        res.status(400);
        throw new Error('Invalid exercise data');
    }
    res.status(201).json(exercise);
});


const updateExercise = asyncHandler(async (req, res) => {
    const {exercisename, bodypart, description, ispublic} = req.body;
    const exercise = await Exercise.findById(req.params.id);
    console.log(exercise);

    if(!exercise) {
        res.status(404);
        throw new Error('Exercise not found');
    }
    if(exercise.user.toString() !== req.user.toString()) {
        res.status(401);
        throw new Error('Not authorized');
    }
    exercise.exercisename = exercisename;
    exercise.bodypart = bodypart;
    exercise.description = description;
    exercise.ispublic = ispublic;
    const updatedExercise = await exercise.save();
    if(updatedExercise) {
        res.json(updatedExercise);
    } else {
        res.status(400);
        throw new Error('Invalid exercise data');
    }
});

const deleteExercise = asyncHandler(async (req, res) => {
    const exercise = await Exercise.findById(req.params.id);
    if(!exercise) {
        res.status(404);
        throw new Error('Exercise not found');
    }
    if(exercise.user.toString() !== req.user.toString()) {
        res.status(401);
        throw new Error('Not authorized');
    }
    await exercise.remove();
    res.json({message: 'Exercise removed'});
});

module.exports = {
    getExercises, 
    createExercise, 
    updateExercise, 
    deleteExercise
};