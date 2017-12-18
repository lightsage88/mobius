'use strict'
const express = require('express');
const bodyParser = require('body-parser');
const {Hooman} = require('./models');
const router = express.Router();

const request = require('request');
//here we are setting up the necessary middleware to process and parse data
//in the JSON Javascript Object Notation format
const jsonParser = bodyParser.json();

//here we set up the api/hoomans/ endpoint with a POST method
//this is to set up a NEW HOOMAN, user

// flow is :
// user clicks a button 
// then ajax requests to endpoint on backend that uses Mongoose to fuck with your database
// once it has done that it sends backa  response and then the callback function from your ajax requeset
// executes

// passport stoes property on request object called user that has user ID...don't need to 
// //can do const userId= req.user(id)...console.log(req.user) to see if it has the thing to begin with.
router.put('/char', jsonParser, function(req,res){
	
	let {username, marvelousData} = req.body;
	Hooman.updateOne(
		{username},
		{$addToSet: {marvelousData: marvelousData} }
	)
	.then((response)=>{
		console.log(response);
		res.status(202).json(response);
	})
});

router.get('/char', jsonParser, function(req, res){
	let {username} = req.headers;
	console.log(username);
	Hooman.findOne({username})
	.then(function(hooman){
	console.log(hooman);
	res.status(200).json(hooman);
	})
	
})
 

router.put('/', jsonParser, function(req,res){
	console.log(req.body);
let {firstName, lastName, password, username} = req.body;
firstName = firstName.trim();
lastName = lastName.trim();
password = password;
if((!password) || (password === null)){
	return res.status(422).json({
		code: 422,
		reason: 'lack of Password',
		message: 'missing pw',
		location: password
	});
}
const explicitlyTrimmedField = ['password'];
const nonTrimmedField = explicitlyTrimmedField.find(
turkey => req.body[turkey].trim() !== req.body[turkey]
);
	if(nonTrimmedField) {
		return res.status(422).json({
			code: 422,
			reason: 'ValidationError',
			message: 'You have heavy thumbs and included spaces where they should not have been',
			location: nonTrimmedField
		});
	}
const sizeRule = {
	password: {
		min: 6,
		max: 20
	}
};
const badlySizedField = explicitlyTrimmedField.find(turkey => {
	req.body[turkey]
});
	if(badlySizedField) {
		return res.status(422).json({
			code: 422,
			reason: 'ValidationError',
			message: 'Your inputs are not within size guidelines',
			location: badlySizedField
		});
	}
Hooman.updateOne({username},
			{$set: {firstName: firstName, lastName: lastName}}
			)
			.then(function(){
				// console.log(response);
				// res.status(202).json(response);
				return Hooman.findOne({username})
				.then((response)=>{
					console.log(response);
					res.status(202).json(response);
				})
			})
			.catch((err)=>{
				console.log(err);
				console.error(err);
			});

});

router.post('/', jsonParser, function(req, res){
	console.log(req.body);
	const requiredFields = ['username', 'password'];
	const missingField = requiredFields.find(function(field){
		return !(field in req.body);
	});

	if (missingField) {
		return res.status(422).json({
			code: 422,
			reason: 'ValidationError',
			message: 'Missing field',
			location: missingField
		});
	}
const stringFields = ['username', 'password', 'firstName', 'lastName'];

	const nonStringField = stringFields.find(function(field){
		return field in req.body && typeof req.body[field] !== 'string';
	});

	if (nonStringField) {
		return res.status(422).json({
			code: 422,
			reason: 'ValidationError',
			message: 'Incorrect field type: you were supposed to input a string',
			location: nonStringField
		});
	}
// //Old people and fat fingered people have trouble typing. It happens to me all
// //the time. Sometimes you're going to hit space when you don't mean to while defining
// //sensitive login credentials like passwords or usernames. This will help clean that
// //stuff up.

// //we define 'explicitlyTrimmedFields' to equal an array with values of 'username' and 'password'
	const explicitlyTrimmedFields = ['username','password'];
// //we define 'nonTrimmedField' as the find method with an anon func searching for
// //a field/turkey.
// //It will return the evaluation of the explicitlyTrimmedFields being found in the 
// //request object body and having the trim() method [which deletes any whitespaces] run on it
// //and then seeing if that is NOTequal to the same things without the trim() method run on it.
// //if it is equal, then nonTrimmedField becomes 'TRUE' and then we throw an error much like
// //we have done above two times already
	const nonTrimmedField = explicitlyTrimmedFields.find(
		turkey => req.body[turkey].trim() !== req.body[turkey]
	);
// //Now if nonTrimmedField has a value of 'true', we return, yet again, the same kind of
// //error as above, but with a slightly different message, reflected the presence of 
// //white spaces, and how that is a problem and point the location of the error to be
// //the variable 'nonTrimmedField'
	if(nonTrimmedField) {
		return res.status(422).json({
			code: 422,
			reason: 'ValidationError',
			message: 'You have heavy thumbs and included spaces where they should not have been',
			location: nonTrimmedField
		});
	}
// //Now we will being dealing with security issues and such. We're to define an object
// //called sizedFields and it will contain objects which contain keys of min and max.
// //these values will reflect how long or short we will want usernames and passwords to be
// //and their limits
const sizedFields = {
	username: {
		min: 1
	},
	password : {
		//bcrypt, which will be doing out password hashing for security,
		//truncates data given to it after 72 characters, so you could reasonably
		//protect a password up to 72 chars in length
		min: 6,
		max: 20
	}
};
// //We set the var tooSmallField to equal the evaluation of 
// //sizedFields' keys being scoured to find its keys...now while sizedFields
// //is an object housing other objects (username and password), given their relationship
// //they are considered to be 'keys', though in the classical sense, the keys are
// //the instances of min and max
// //At any rate we want to find look into the inner objects[~keys] of sizedFields
// //and search for the presence of 'min' as a key for either username or password
// // we want that part to return as true, then we evaluate ASWELL due to &&
// //whether or not the request object's body's version of ('min', kirby) has a length
// //that is smaller than the value set by sizedFields[kirby/username or password].min
// //if the request body's version is too small, we return True as well...and then
// //we have a TRUE value for tooSmallField...which will throw an error soon.
const tooSmallField = Object.keys(sizedFields).find(function(kirby){
	return 'min' in sizedFields[kirby] 
// 	//it must be noted that the line above establishes that tooSmallField,
// 	//when true, gets a value assigned to it where min is present?...????
	&&
			req.body[kirby].trim().length < sizedFields[kirby].min;
});
// //but first...the search for things that are TOO BIIIIIG
// //in botht hese cases, deDede and kirby will be replaced with
// //username or password as the function cycles through the contents of the
// //sizedFields and finds 'max' or 'min' in the sizedFields 'keys', which are
// //techincally objects under its dominion.
const tooLargeField = Object.keys(sizedFields).find(function(deDede){
	return 'max' in sizedFields[deDede] &&
			req.body[deDede].trim().length > sizedFields[deDede].max;
});

// //Now we use a logical operator || to say OR, so we can save some coding time
// //We will use this OR || operator in the context of saying if there is either
// //a positive value/TRUE attributed to the variables of tooSmallField or tooLargeField,
// //then we will be throwing an error. We will even use a tenrary operator to send
// //different messages to the use based on which value evaluated as TRUE
if(tooSmallField || tooLargeField) {
// 	//if either of these are said to be TRUE, then we are going to log it to the console
	console.log(tooSmallField||tooLargeField);
// 	//Object.keys() returns an array of whatever object is passed into it :)
	console.log(sizedFields[tooSmallField]);
// //at any rate, if tooSmallField or tooLargeField have a value of TRUE,
// //we will be returning an error status code and a json
	return res.status(422).json({
		code: 422,
		reason: 'ValidationError',
		//Ternary operators work like...is the first thing you're 
		//presenting the truth? then if yes, you immediately follow up with some
		// `` marks with your desired code inside, then follow with a colon
		//to store code for if the implied question's answer is different
		message: tooSmallField ? `Needs to be at least ${sizedFields[tooSmallField].min}
		characters long`
		: `Can not be any longer than ${sizedFields[tooLargeField].max} characters long`,
		location: tooSmallField || tooLargeField
	});
}

// //We use a destructuring assignment to establish that the following variables
// //must come from the request object's body.
// //we set the firstName and lastName as ''
//changed 180, I want the actual names of people.
console.log(req.body);
let {username, password, firstName, lastName} = req.body;


//after we establish that things are coming from the req.body...
//(security purposes?)
//we then state that firstName and lastName are equal to themselves with
//the trim() function chained on at the end.
// firstName = firstName.trim();
// lastName = lastName.trim();
//this we do to determine whether a username has been set already
//we search in the Hooman database/collection to find an entry with
//the username from the request body and count how many instances there
//of such a username in the db/collection
return Hooman.find({username})
	.count()
	.then(function(count){
		console.log(count);
		if( count > 0) {
			//it counts the number ofentries in the db/collection
			//with that particular {username}. If there are more than zero,
			//it's time to return the reject of a Promise!
			return Promise.reject({
				code: 422,
				reason: 'ValidationError',
				message: 'Someone already nabbed that username!',
				location: 'username'
			});
		}
		//however...if the count is less than or equal to zero...
		//hash the password that is in the req.body
		return Hooman.hashPassword(password);
		//the above code is from models.js L67...we will literally be
		//returning into the next part whatever the result of this code is
		})//now the 'hash' will be sent to the next .then() block :)
	.then(function(hash){
		console.log(hash);
		//I assume schemas have built in create methods in them, because
		//we simply invoke the variable set in hoomans/models.js and begin
		//filling in available information to fit what the schema we created
		//looks like
		return Hooman.create({
			username,
			password: hash,
			firstName,
			lastName
		});
	})
	//there's more...now we are going to return a response object with
	//the status of 201 to let the client know that a Hooman was created
	//the Hooman was returned from the end of the last block, so we will be playing
	//with that now in the following .then() block.
	.then(function(hooman){
		//we will send a 201 status and a json object with the hooman
		//going through the apiRepr() method we defined in models.js
		return res.status(201).json(hooman.apiRepr());
	})
	.catch(function(err){
		//if there is a problem and the reason for the error evaluates
		//to the 'ValidationError' we have been using so much, then it is
		//safe to display the err code and the error
		if(err.reason === 'ValidationError') {
			return res.status(err.code).json(err);
		}
		//if the reason is something other than 'ValidationError', we could be
		//dealing with something that involves more sensitive information and it
		//is best to give a more generic error message that doesnt share too many details
		res.status(500).json({code:500, message: 'Something is wack on our end'});
	});
});

//Now we will define an endpoint for not any particular file tree destination, but
//with a GET method. It will show us if we are indeed creating users that are
//establishing permanence in our database
//**written with classic function declarations
router.get('/', function(req, res){
	return Hooman.find()
	//says to find all the Hooman entries
	.then(function(hoomans){
	// console.log(hoomans);
	let set = [];
	for(let i=0; i<=hoomans.length-1; i++){
		set.push(hoomans[i].apiRepr());
	}
	console.log(set);
	console.log(set[0].id);
	return res.status(200).json(set);
	})
	//if there is an error, we will send a very basic message back in jSON
	//and return a status code of 500
	.catch(function(err){
		return res.status(500).json({message: 'Internal server screwup'});
	});
});


router.delete('/', jsonParser, (req,res)=> {
	let {id} = req.body;
	return Hooman.findOne({'_id': id})
	.then((hooman)=>{
		let killSwitch = id;
		console.log(hooman);
		return Hooman.deleteOne({'_id': killSwitch})
			.then(()=>{
			console.log(`account id ${killSwitch} terminated`);
			return res.status(204).json({message: 'Account Terminated'});
		})
	.catch((err)=>{
		console.log(err);
		console.error(err);
		return res.status(500).json({message: 'Internal Server Issue'});
	});
	})

	
});










router.delete('/char', jsonParser, function(req,res){
	let {username, characterName} = req.body;
	return Hooman.findOne({'username':username})
		.then((hooman)=>{
		let marvelousData =	hooman.marvelousData;
		console.log(characterName);
		for(let i=0; i<=marvelousData.length-1; i++) {
			if(marvelousData[i].name === characterName) {
				console.log(`deleting ${characterName}`);
				let target = marvelousData[i];
				Hooman.update({'username':username},{$pull : {marvelousData:target}},
							function(err, data) {
								if(err) {
									return res.status(500).json({'error': 'gosh darn'});
								} else {
									return res.status(200).json(data);
								}
							}
							)

			}
		}
		})
		.then((res)=>{
			return res.status(200).json('hamburger');

		});
});
	



//we will export so that other documents in our file tree can reference these
//router methods and apply the various tests it will apply to users submissions when
//trying to create accounts properly.
module.exports = {router}; 