const express = require('express')
const router = express.Router();
const jwt = require('jsonwebtoken');

// This is where we import the controllers we will route
const tripsController = require("../controllers/trips");
const authController = require("../controllers/authentication");


 // Method to authenticate our JWT
function authenticateJWT(req, res, next) {
    // console.log('In Middleware');

    const authHeader = req.headers['authorization'];
    // console.log('Auth Header: ' + authHeader);

    if (authHeader == null) {
        console.log('Auth Header Required but NOT PRESENT!');
        return res.sendStatus(401);
    }

    const headers = authHeader.split(' ');

    if (headers.length !== 2 || headers[0] !== 'Bearer') {
        console.log('Invalid Authorization Header');
        return res.sendStatus(401);
    }

    const token = headers[1];
    // console.log('Token: ' + token);

    if (!token) {
        console.log('Null Bearer Token');
        return res.sendStatus(401);
    }

    // Verify the JWT using the secret stored in .env
    jwt.verify(token, process.env.JWT_SECRET, (err, verified) => {
        if (err) {
            console.log('Token Validation Error!');
            return res.status(401).json({
                message: 'Token Validation Error!'
            });
        }

        // Store decoded JWT data on the request
        req.auth = verified;

        // Continue to the protected controller only after verification
        next();
    });
}


router.route("/register").post(authController.register);
router.route("/login").post(authController.login);

// Define route for our trips endpoint
router
    .route('/trips')
    .get(tripsController.tripsList)
    .post(authenticateJWT, tripsController.tripsAddTrip);

// GET method routes tripsFindByCode - requires parameter
// PUT method routes tripsUpdateTrip - requires parameter
router
    .route('/trips/:tripCode')
    .get(tripsController.tripsFindByCode)
    .put(authenticateJWT, tripsController.tripsUpdateTrip);


module.exports = router;