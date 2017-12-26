
const express = require('express');
const passport = require('passport');
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');

const config = require('../config');
const router = express.Router();

const createAuthToken = function(hooman) {

	return jwt.sign({hooman}, config.JWT_SECRET, {
		subject: hooman.username,
		expiresIn: config.JWT_EXPIRY,
		algorithm: 'HS256'
	});
};

const localAuth = passport.authenticate('local', {session: false});

router.use(bodyParser.json());

router.post('/login', localAuth, function(req, res){
	const authToken = createAuthToken(req.user.apiRepr());
	
	res.json({authToken});
	
});

const jwtAuth = passport.authenticate('jwt', {session: false});


router.post('/refresh', jwtAuth, function(req, res){
	
	const authToken = createAuthToken(req.user);
	res.json({authToken});
});

module.exports = {router};











