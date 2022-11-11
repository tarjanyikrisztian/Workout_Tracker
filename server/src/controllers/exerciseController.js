const asyncHandler = require('express-async-handler');
const Exercise = require('../models/exerciseModel');
const User = require('../models/userModel');
const jwt = require('jsonwebtoken');

const getExercises = asyncHandler(async (req, res) => {
    const exercisesPublic = await Exercise.find({ ispublic: true });
    let token;
    let user;
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        token = req.headers.authorization.split(' ')[1];
        const decoded = jwt.verify(token, process.env.SECRET);
        user = await User.findById(decoded.id).select('-password');
    }
    if (user) {
        const exercisesMy = await Exercise.find({ user: user._id });
        const exercises = [...exercisesMy, ...exercisesPublic];
        const uniqueExercises = exercises.filter((value, index) => {
            const _value = JSON.stringify(value);
            return index === exercises.findIndex(obj => {
                return JSON.stringify(obj) === _value;
            });
        });
        // foreach exercise, change image to base64 
        res.status(200).json(uniqueExercises);
    } else {
        res.status(200).json(exercisesPublic);
    }
});

const createExercise = asyncHandler(async (req, res) => {
    const { exercisename, bodypart, description, ispublic, image, imageType } = req.body;
    const user = req.user;
    if (!exercisename || !bodypart) {
        res.status(400).json({ message: 'Please fill in all fields' });
        throw new Error('Please fill all fields');
    }
    const exerciseExistsPublic = await Exercise.findOne({ exercisename, ispublic: true });
    const exerciseExistBySameUser = await Exercise.findOne({ exercisename, user });
    if (exerciseExistsPublic || exerciseExistBySameUser) {
        res.status(400).json({ message: 'Exercise already exists' });
        throw new Error('This excercise already exists');
    }
    const exercise = await Exercise.create({
        exercisename,
        bodypart,
        description,
        ispublic,
        image,
        imageType,
        user,
    })
    if (!exercise) {
        res.status(400).json({ message: 'Invalid exercise data' });
        throw new Error('Invalid exercise data');
    }
    res.status(201).json(exercise);
});


const updateExercise = asyncHandler(async (req, res) => {
    const { user, exercisename, bodypart, description, ispublic, image } = req.body;
    const exercise = await Exercise.findById(req.params.id);

    if (!exercise) {
        res.status(404).json({ message: 'Exercise not found' });
        throw new Error('Exercise not found');
    }
    if (exercise.user.toString() !== user.toString()) {
        res.status(401).json({ message: 'Not authorized' });
        throw new Error('Not authorized');
    }
    exercise.exercisename = exercisename;
    exercise.bodypart = bodypart;
    exercise.description = description;
    exercise.ispublic = ispublic;
    exercise.image = image;
    const updatedExercise = await exercise.save();
    if (updatedExercise) {
        res.json(updatedExercise);
    } else {
        res.status(400).json({ message: 'Invalid exercise data' });
        throw new Error('Invalid exercise data');
    }
});

const deleteExercise = asyncHandler(async (req, res) => {
    const exercise = await Exercise.findById(req.params.id);
    if (!exercise) {
        res.status(404).json({ message: 'Exercise not found' });
        throw new Error('Exercise not found');
    }
    await exercise.remove();
    res.json({
        message: 'Exercise removed',
        _id: exercise._id,
    });
});

const likeExercise = asyncHandler(async (req, res) => {
    const exercise = await Exercise.findById(req.params.Eid);
    if (!exercise) {
        res.status(404).json({ message: 'Exercise not found' });
        throw new Error('Exercise not found');
    }
    if (exercise.likedBy.includes(req.params.Uid)) {
        res.status(400).json({ message: 'Exercise already liked' });
        throw new Error('Exercise already liked');
    }
    exercise.likedBy.push(req.params.Uid);
    exercise.likes = exercise.likedBy.length;
    const updatedExercise = await exercise.save();
    if (updatedExercise) {
        res.json(updatedExercise);
    } else {
        res.status(400).json({ message: 'Invalid exercise data' });
        throw new Error('Invalid exercise data');
    }
});

const dislikeExercise = asyncHandler(async (req, res) => {
    const exercise = await Exercise.findById(req.params.Eid);
    if (!exercise) {
        res.status(404).json({ message: 'Exercise not found' });
        throw new Error('Exercise not found');
    }
    if (!exercise.likedBy.includes(req.params.Uid)) {
        res.status(400).json({ message: 'Exercise not liked' });
        throw new Error('Exercise not liked');
    }
    exercise.likedBy = exercise.likedBy.filter(user => user.toString() !== req.params.Uid.toString());
    exercise.likes = exercise.likedBy.length;
    const updatedExercise = await exercise.save();
    if (updatedExercise) {
        res.json(updatedExercise);
    } else {
        res.status(400).json({ message: 'Invalid exercise data' });
        throw new Error('Invalid exercise data');
    }
});

module.exports = {
    getExercises,
    createExercise,
    updateExercise,
    deleteExercise,
    likeExercise,
    dislikeExercise,
};