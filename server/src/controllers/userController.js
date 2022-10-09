const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const asyncHandler = require('express-async-handler');
const User = require('../models/userModel');


const registerUser = asyncHandler(async (req, res) => {
    const {username, email, password} = req.body;
    if(!username || !email || !password) {
        res.status(400);
        throw new Error('Please fill all fields');
    }
    const userEmailExists = await User.findOne({email});
    if(userEmailExists) {
        res.status(400);
        throw new Error('Email already exists');
    }
    const userUsernameExists = await User.findOne({username});
    if(userUsernameExists) {
        res.status(400);
        throw new Error('Username already exists');
    }
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    const user = await User.create({
        username,
        email,
        password: hashedPassword
    });  

    if(user) {
        res.status(201).json({
            _id: user._id,
            username: user.username,
            email: user.email,
            token: generateToken(user._id)
        });
    } else {
        res.status(400);
        throw new Error('Invalid user data');
    }

});

const loginUser = asyncHandler(async (req, res) => {
    const {email, password} = req.body;
    const user = await User.findOne({email});
    if(user && (await bcrypt.compare(password, user.password))) {
        res.json({
            _id: user._id,
            username: user.username,
            email: user.email,
            token: generateToken(user._id)
        });
    } else {
        res.status(401);
        throw new Error('Invalid username or password');
    }
});



const getMe = asyncHandler(async (req, res) => {
    res.status(200).json(req.user);
});



const generateToken = (id) => {
    return jwt.sign({id}, process.env.SECRET, {
        expiresIn: '30d'
    });
};

module.exports = {
    registerUser,
    loginUser,
    getMe
};