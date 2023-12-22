const User = require('../models/user.model');
const express = require('express');
const Router = express.Router();
const bcrypt = require('bcrypt');

const jwt = require('jsonwebtoken');
const passport = require('passport');
const authenticate = require('../middleware/auth')

require('dotenv').config();

const newToken = (user) => {
    return jwt.sign({ user }, process.env.JWT_SECRET_KEY)
}

Router.post('/registration', async (req, res) => {

    let { name, email, password } = req.body;

    try {
        const existingUser = await User.findOne({ email }).maxTimeMS(20000);
        

        if (existingUser != null) {
            return res.status(400).send('Email id already Exists')
        }

        bcrypt.hash(password, 5, async function (err, hash) {
            if (err) {
                res.status(500).send("Error hashing password");
            }
            else {
                password = hash
                const newUser = new User({ name, email, password });
                await newUser.save();
                res.status(200).send("New user has been created");
            }
        });
    }
    catch (err) {
        res.status(500).send(err.message);
    }
})

Router.post('/login', async (req, res) => {
    try {

        const user = await User.findOne({ email: req.body.email });

        if (!user) {
            res.status(404).send("User not found");
        }
        else {
            bcrypt.compare(req.body.password, user.password, function (err, result) {
                if (!result) {
                    res.status(404).send("Wrong credentials");
                }

                else {
                    const obj = { id: user._id, name: user.name, email: user.email };

                    obj.user_agent = req.get("User-Agent");
                    const token = newToken(obj);
                    res.status(200).send({ token, message: "User Successfully logged in" })
                }
            })
        }
    }
    catch (err) {
        res.status(500).send(err.message);
    }
})


const loadAuth = (req, res) => {
    res.render('auth');
}

const successGoogleLogin = (req , res) => { 
	if(!req.user) 
		res.redirect('/failure'); 
    console.log(req.user);
	res.send("Welcome " + req.user.email); 
}

const failureGoogleLogin = (req , res) => { 
	res.send("Error"); 
}


module.exports = { Router, loadAuth,
    successGoogleLogin,
    failureGoogleLogin}