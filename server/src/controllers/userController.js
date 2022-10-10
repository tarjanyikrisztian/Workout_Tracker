const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const asyncHandler = require('express-async-handler');
const User = require('../models/userModel');


const registerUser = asyncHandler(async (req, res) => {
    const { username, email, password } = req.body;
    if (!username || !email || !password) {
        res.status(400).json({ message: 'Please fill in all fields' });
        throw new Error('Please fill all fields');
    }
    const userEmailExists = await User.findOne({ email });
    if (userEmailExists) {
        res.status(400).json({ message: 'Email already exists' });
        throw new Error('Email already exists');
    }
    const userUsernameExists = await User.findOne({ username });
    if (userUsernameExists) {
        res.status(400).json({ message: 'Username already exists' });
        throw new Error('Username already exists');
    }
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    const user = await User.create({
        username,
        email,
        password: hashedPassword,
    });

    if (user) {
        res.status(201).json({
            _id: user._id,
            username: user.username,
            email: user.email,
            token: generateToken(user._id, '1h'),
            verified: user.verified
        });
    } else {
        res.status(400).json({ message: 'Invalid user data' });
        throw new Error('Invalid user data');
    }

});

const loginUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (user && (await bcrypt.compare(password, user.password))) {
        if (user.verified) {
            res.json({
                _id: user._id,
                username: user.username,
                email: user.email,
                token: generateToken(user._id, '1h'),
                verified: user.verified
            });
        } else {
            res.status(401).json({
                message: 'Please verify your email'
            });
            throw new Error('User not verified, please check your email');
        }
    } else {
        res.status(401).json({
            message: 'Invalid email or password'
        });
        throw new Error('Invalid email or password');
    }
});

const verifyUser = asyncHandler(async (req, res) => {
    const token = req.params.token;
    const id = req.params.id;
    const decoded = jwt.verify(token, process.env.SECRET);
    if (decoded.id === id) {
        const user = await User.findById(id);
        if (user) {
            if (!user.verified) {
                user.verified = true;
                await user.save();
                res.status(200)
                    .json({
                        _id: user._id,
                        username: user.username,
                        email: user.email,
                        token: generateToken(user._id, '7d'),
                        verified: user.verified
                    });
            } else {
                res.status(400).json({
                    message: 'User already verified'
                });
                throw new Error('User already verified');
            }
        } else {
            res.status(404).json({
                message: 'User not found'
            });
            throw new Error('User not found');
        }
    } else {
        res.status(401).json({
            message: 'Invalid token'
        });
        throw new Error('Invalid token');
    }
});

const getMe = asyncHandler(async (req, res) => {
    res.status(200).json(req.user);
});



const generateToken = (id, time) => {
    return jwt.sign({ id }, process.env.SECRET, {
        expiresIn: time
    });
};

module.exports = {
    registerUser,
    loginUser,
    getMe,
    verifyUser
};