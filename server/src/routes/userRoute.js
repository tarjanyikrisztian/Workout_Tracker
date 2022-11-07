const express = require('express');
const router = express.Router();
const {registerUser , loginUser, getMe, verifyUser, updateUser} = require('../controllers/userController');
const {protect} = require('../middleware/authMiddleware');

router.post('/register', registerUser);
router.post('/login', loginUser);
router.put('/update', protect, updateUser);
router.get('/me', protect, getMe);
router.get('/:id/verify/:token', verifyUser);




module.exports = router;