
const mongoose = require('mongoose');
const User = require('../models/user');
const passport = require('passport');

const register = async (req, res) => {

    // Validate message to ensure that all parameters are present
    if (!req.body.name || !req.body.email || !req.body.password) {
        return res
            .status(400)
            .json({ "message": "All fields required" });
    }

    try {
        const user = new User({
            name: req.body.name,     // Set user name
            email: req.body.email    // Set e-mail address
        });

        // Set user password
        user.setPassword(req.body.password);

        const q = await user.save();

        if (!q) {
            // Database returned no data
            return res
                .status(400)
                .json({ "message": "Unable to register user" });
        } else {
            // Return new user token
            const token = user.generateJWT();

            return res
                .status(200)
                .json(token);
        }

    } catch (err) {
        return res
            .status(400)
            .json({ "message": err.message });
    }
};


const login = (req, res) => {
    // Validate that email and password are present
    if (!req.body.email || !req.body.password) {
        return res
            .status(400)
            .json({ "message": "All fields required" });
    }

    // Delegate authentication to Passport
    passport.authenticate('local', (err, user, info) => {
        if (err) {
            // Error in authentication process
            return res
                .status(404)
                .json(err);
        }

        if (user) {
            // Authentication succeeded - generate JWT
            const token = user.generateJWT();

            return res
                .status(200)
                .json({ token });
        } else {
            // Authentication failed
            return res
                .status(401)
                .json(info);
        }
    })(req, res);
};


module.exports = {
    register,
    login
};
