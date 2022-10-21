const express = require('express');
const router = express.Router();
const {getExercises, createExercise, updateExercise, deleteExercise, likeExercise, dislikeExercise } = require('../controllers/exerciseController');

const {protect} = require('../middleware/authMiddleware');

router.route('/').get(getExercises).post(protect, createExercise);

router.route('/:id').put(protect, updateExercise).delete(protect, deleteExercise);

router.route('/:Uid/like/:Eid').put(likeExercise);

router.route('/:Uid/dislike/:Eid').put(dislikeExercise);

module.exports = router;