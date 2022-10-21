const express = require('express');
const router = express.Router();
const {registerUser , loginUser, getMe, verifyUser, addLikedExercise, removeLikedExercise} = require('../controllers/userController');
const {protect} = require('../middleware/authMiddleware');

router.post('/register', registerUser);
router.post('/login', loginUser);
router.get('/me', protect, getMe);
router.get('/:id/verify/:token', verifyUser);




module.exports = router;