//we omit use strict for experimentational purposes, just to see what happens

//we first state the middleware we are going to be using/our dependencies
const express = require('express');
const passport = require('passport');
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');

//we state that config will be referred as the document elsewhere in our tree
const config = require('../config');
//here router is a method of express
const router = express.Router();

const createAuthToken = function(hooman) {
	//we use the method jwt.sign() to create a jwt for our user
	//first argument is the payload referring to the user, in this case it
	//is hooman, then we pass in the secret that is held in the config.js file
	//but we do so by referring to it, then we pass in an object containing
	//additional options and claims
	//we set the subject of the jwt to be the username string in the hooman object
	//we get our expiration time for the jwt from the config.js file and we specify
	//the algorithm used to create our jasonwebtoken
	return jwt.sign({hooman}, config.JWT_SECRET, {
		subject: hooman.username,
		expiresIn: config.JWT_EXPIRY,
		algorithm: 'HS256'
	});
};
//we define localAuth; a variable that will return a middleware function for passport
//we tell passport to use the 'local' strategy, which we defined in strategies.js
//and then we pass in a object with a key of session with a value of false; this prevents
//the use of cookies for authentication.
const localAuth = passport.authenticate('local', {session: false});
//we tell the router aspect of express, since router is express.Router() to use
//bodyParser's json functionality to parse request and response objects
router.use(bodyParser.json());
//here we have an endpoint being set up for the /login end point
//with a POST method. we use the localStrategy, courtesy of localAuth, and have a callback function
//with request and response objects as arguments. The block contains the variable of authToken
//which will have the value returned by the result of the createAuthToken function we defined on line
//14!!
router.post('/login', localAuth, function(req, res){
	const authToken = createAuthToken(req.hooman.apiRepr());
	//after an authToken is made via the function we defined on line 14, the token is sent in a response
	//as JSON
	res.json({authToken});
});

//telling passport to use the 'jwt' strategy when ever we pass in jwtAuth
const jwtAuth = passport.authenticate('jwt', {session: false});
//recall that in our jwtStrategy, there is a part in it that extracts the JWT from
//a header that is called "Bearer"

router.post('/refresh', jwtAuth, function(req, res){
	//after the authentication strategy goes forth successfully from jwtAuth,
	//it is going to be unnecessary for us to create an authtoken from
	//a database entry, hooman, that hasn't gone through the apiRepr() process,
	//so we will skip it this go around
	const authToken = createAuthToken(req.user);
	//then we return the new authToken
	res.json({authToken});
});

module.exports = {router};











