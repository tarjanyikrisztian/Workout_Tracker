const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const asyncHandler = require('express-async-handler');
const User = require('../models/userModel');
const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL,
        pass: process.env.EMAIL_PASSWORD
    }
});


const registerUser = asyncHandler(async (req, res) => {
    const { firstname, lastname, email, password } = req.body;
    if (!firstname || !lastname || !email || !password) {
        res.status(400).json({ message: 'Please fill in all fields 🤔' });
        throw new Error('Please fill all fields');
    }
    const userEmailExists = await User.findOne({ email });
    if (userEmailExists) {
        res.status(400).json({ message: 'Email already exists 😫' });
        throw new Error('Email already exists');
    }
    const username = `${firstname}${lastname}${Date.now()}`;
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    const user = await User.create({
        firstname,
        lastname,
        username: username.toLowerCase(),
        email,
        password: hashedPassword,
    });

    if (user) {
        const verifyUrl = "localhost:5000/user/" + user._id + "/verify/" + generateToken(user._id, '1d');
        console.log(verifyUrl);
        const mailOptions = {
            from: process.env.EMAIL,
            to: user.email,
            subject: 'Please verify your email @ WORKOUT TRACKER 😎',
            html: `<h1>Hi ${user.firstname}!</h1>
            <h3>Thank you for registering at WORKOUT TRACKER.</h3>
            <p>Please click the link below to verify your email address or copy and paste the link into your browser.</p>
            <a href=${verifyUrl}>${verifyUrl}</a>
            <p>Thank you ❤.</p>`
        };

        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                console.log(error);
            } else {
                console.log('Email sent: ' + info.response);
            }
        });

        res.status(201).json({
            message: verifyUrl,
        });
    } else {
        res.status(400).json({ message: 'Invalid user data 😢' });
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
                firstname: user.firstname,
                lastname: user.lastname,
                bio: user.bio,
                email: user.email,
                image: user.image,
                token: generateToken(user._id, '1d'),
                verified: user.verified,
            });
        } else {
            res.status(401).json({
                message: 'Please verify your email! 📧'
            });
            throw new Error('User not verified, please check your email');
        }
    } else {
        res.status(401).json({
            message: 'Invalid email or password 🤔'
        });
        throw new Error('Invalid email or password');
    }
});

const updateUser = asyncHandler(async (req, res) => {
    const user = await User.findById(req.user._id);
    if (user) {
        user.firstname = req.body.firstname || user.firstname;
        user.lastname = req.body.lastname || user.lastname;
        user.bio = req.body.bio || user.bio;
        user.image = req.body.image || user.image;
        /*if (req.body.password) {
            const salt = await bcrypt.genSalt(10);
            user.password = await bcrypt.hash(req.body.password, salt);
        }*/

        const updatedUser = await user.save();
        res.json({
            _id: updatedUser._id,
            firstname: updatedUser.firstname,
            lastname: updatedUser.lastname,
            bio: updatedUser.bio,
            email: updatedUser.email,
            image: updatedUser.image,
            token: generateToken(updatedUser._id, '1d'),
            verified: updatedUser.verified,
        });
    } else {
        res.status(404);
        throw new Error('User not found');
    }
});

const verifyUser = asyncHandler(async (req, res) => {
    const token = req.params.token;
    const id = req.params.id;
    try{
        const decoded = jwt.verify(token, process.env.SECRET);
        if (decoded.id === id) {
            const user = await User.findById(id);
            if (user) {
                if (!user.verified) {
                    user.verified = true;
                    await user.save();
                    return res.redirect('http://localhost:5173');
                } else {
                    res.status(400).json({
                        message: 'User already verified 🤔'
                    });
                    throw new Error('User already verified');
                }
            } else {
                res.status(404).json({
                    message: 'User not found 😢'
                });
                throw new Error('User not found');
            }
        } else {
            res.status(401).json({
                message: 'Invalid token 😢'
            });
            throw new Error('Invalid token');
        }
    } catch (err) {
        const verifyUrl = "localhost:5000/user/" + id + "/verify/" + generateToken(id, '1d');
        res.status(401).json({
            message: 'Token has expired 😢'
        });
        // send email to user with verifyUrl
        throw new Error('Token has expired');
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
    updateUser,
    verifyUser,
};