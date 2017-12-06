//we are omitting 'use strict' for experimental purposes
//Here we will define our strategies, our localStrategy and our JwtStrategy and ExtractJwt strategy

// We will use destructuring arguments to define the strategies' other variable names and what documents
// are required to be referenced

const {Strategy: LocalStrategy} = require('passport-local');
const {Strategy: JwtStrategy, ExtractJwt} = require('passport-jwt');

//here we require that when we refer to Hooman, w are going to need this file to back up and
//refer to the models file in the hooman folder
const {Hooman} = require('../hoomans/models');
//for us to refer to JWT_SECRET, we will need the use of the config.js file.
const {JWT_SECRET} = require('../config');

//we are going to be using this function (which smacks of an object constructor) to help us
//authenticate locally
const localStrategy = new LocalStrategy(function(username, password, callback){
	//we will declare hooman as an empty yet malleable variable that can be altered
	//through the course of the strategy's execution
	let hooman;
	//we tell mongodb and passport to work together to look in our collection/db
	//and seek a username that equals what we passed in on line 18
	Hooman.findOne({username: username})
		//then we run a function with whatever that mongodb command yielded...we will
		//call that result whatWasFound, instead of _hooman, because it makes more vernacular sense
		.then(function(whatwasFound){
			hooman = whatwasFound;
			//if hooman, equaling whatwasFound, is shown to lack any substance or not exist, then we will have an error
			if(!hooman) {
				return Promise.reject({
					reason: 'LoginError',
					message: 'Incomplete username or password'
				});
			//however, if hooman is shown to exist we will call the validatePassword method on what was passed in on line 18 for password
			//remember that in models.js the validatePassword method was defined for the HoomanSchema, which was then linked to the use/creation of a 'Hooman'.
			//from line 24 to here we have reassigned Hooman to equal whatwasFound and then hooman, which still grants hooman access to the methods
			//that were written for Hooman, so its a ok.
			}
			return hooman.validatePassword(password);
		})
		//we employ a built in function from one of the middlewares, it will basically take what was returned from the validatePassword method use above
		//and feed it to this next .then() block
		.then(function(isValid){
			//if the password that was validated turns out to NOT be validated, then a Promise reject is returned
			if(!isValid) {
				return Promise.reject({
					reason: 'LoginError',
					message: 'Incorrect username or password'
				});
			}
			//however if the password that was attempted to be validated IS indeed valid, then we will run the passport callback which takes
			//two arguments: the first is the error code to give to passport so it knows to halt any attempts to the endpoint, the second is
			//going to be either the variable representing the user that we are giving the go ahead to, or its going to be the boolean 'false',
			//but only when something is wrong
			return callback(null, hooman);
		})
		.catch(function(err){
			if(err.reason === 'LoginError') {
				//the strategy callback can take a third argument of either a message or the err that was thrown
				//this is okay if the err.reason happens to be 'LoginError', for any other reason, we'll have a different course of action
				return callback(null, false, err);
			}
			//in the event that the err.reason is not 'LoginError', we will have a generic message of our error display???
			return callback(err, false);
		})
});
//now we define out jasonwebtoken strategy
			// there are two main arguments to the JwtStrategy:
			// 1 is the object containing the keys secretOrKey, jwtFromRequest, and algorithms.
			// the 2nd is the anonymous function that has the arguments of payload and done, another function in it

const jwtStrategy = new JwtStrategy(
	{
		//will need to get JWT_SECRET from the .config file
		secretOrKey: JWT_SECRET,
		//will look for the JWT as a Bearer Authentication Header
		jwtFromRequest: ExtractJwt.fromAuthHeaderWithScheme('Bearer'),
		//only allow HS256 tokens - the same as the ones we issue
		algorithms: ['HS256']
	},
	//middlewear gets activated and takes the payload which is the information decoded as a JSON
	//and it decoded the stuff with the special key
	//in the done function/method we pass null for the errors and the .hooman key, and therefore its values, from payload as....the payload
	function(payload, done) {
		done(null, payload.hooman);
	}

);

//we will export all of these as modules and never fear, ExtractJwt is included inside of jwtStrategy, so it
//will automatically come along for the ride

module.exports = {localStrategy, jwtStrategy};