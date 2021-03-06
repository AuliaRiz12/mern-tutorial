const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const asyncHandler = require('express-async-handler')
const User = require('../models/userModel')
// @desc    Register user
// @route   POST /api/users
// @access  Public
const registerUser = asyncHandler(async(req,res) => {
    const { name, email, password } = req.body
    if(!name || !email || !password){
        res.status(400)
        throw Error('Please add all fields')
    }
    //check if user exist
    const userExists = await User.findOne({email})
    if(userExists){
        res.status(400)
        throw Error('User already exists')
    }
    //hash password
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password, salt)
    //create user
    const user = await User.create({
        name, 
        email,
        password: hashedPassword
    })
    if(user){
        res.status(201).json({
            __id: user.id,
            name: user.name,
            email: user.email,
        })
    } else {
        res.status(400)
        throw Error('Invalid user data')
    }
})
// @desc    Login user
// @route   POST /api/users/login
// @access  Public
const loginUser = asyncHandler(async(req,res) => {
    res.json({ message: "Login User"})
    const { email, password } = req.body

    //check for user email
    const user = await User.findOne({email})

    if(user && (await bcrypt.compare(password, user.password))) {
        res.json({
            __id: user.id,
            name: user.name,
            email: user.email,
        })
    } else {
        res.status(400)
        throw Error('Invalid credentials')
    }
})

// @desc    Get user data
// @route   GET /api/users/me
// @access  Public
const getMe = asyncHandler(async(req,res) => {
    res.json({ message: "User data display"})
})
module.exports = { 
    registerUser,
    loginUser,
    getMe
 }