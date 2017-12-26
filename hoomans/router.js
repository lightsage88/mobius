'use strict'
const express = require('express');
const bodyParser = require('body-parser');
const {Hooman} = require('./models');
const router = express.Router();

const request = require('request');

const jsonParser = bodyParser.json();
const bcrypt = require('bcryptjs');


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

Hooman.updateOne({username},
			{$set: {firstName: firstName, lastName: lastName}}
			)
			.then(function(){
				res.status(202);
				return Hooman.findOne({username})
				.then((response)=>{
					console.log(response);
					console.log('I like pigshit to eat');
					console.log(response.password);
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

	const explicitlyTrimmedFields = ['username','password'];

	const nonTrimmedField = explicitlyTrimmedFields.find(
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

const sizedFields = {
	username: {
		min: 1
	},
	password : {
		
		min: 6,
		max: 20
	}
};

const tooSmallField = Object.keys(sizedFields).find(function(kirby){
	return 'min' in sizedFields[kirby] 

	&&
			req.body[kirby].trim().length < sizedFields[kirby].min;
});

const tooLargeField = Object.keys(sizedFields).find(function(deDede){
	return 'max' in sizedFields[deDede] &&
			req.body[deDede].trim().length > sizedFields[deDede].max;
});


if(tooSmallField || tooLargeField) {
	console.log(tooSmallField||tooLargeField);
	console.log(sizedFields[tooSmallField]);

	return res.status(422).json({
		code: 422,
		reason: 'ValidationError',
		
		message: tooSmallField ? `Needs to be at least ${sizedFields[tooSmallField].min}
		characters long`
		: `Can not be any longer than ${sizedFields[tooLargeField].max} characters long`,
		location: tooSmallField || tooLargeField
	});
}


console.log(req.body);
let {username, password, firstName, lastName} = req.body;



return Hooman.find({username})
	.count()
	.then(function(count){
		console.log(count);
		if( count > 0) {
			
			return Promise.reject({
				code: 422,
				reason: 'ValidationError',
				message: 'Someone already nabbed that username!',
				location: 'username'
			});
		}
		
		return Hooman.hashPassword(password);
		
		})
	.then(function(hash){
		console.log(hash);
		
		return Hooman.create({
			username,
			password: hash,
			firstName,
			lastName
		});
	})

	.then(function(hooman){
	
		return res.status(201).json(hooman.apiRepr());
	})
	.catch(function(err){
		
		if(err.reason === 'ValidationError') {
			return res.status(err.code).json(err);
		}
		
		res.status(500).json({code:500, message: 'Something is wack on our end'});
	});
});


router.get('/', function(req, res){
	return Hooman.find()
	.then(function(hoomans){
	let set = [];
	for(let i=0; i<=hoomans.length-1; i++){
		set.push(hoomans[i].apiRepr());
	}
	console.log(set);
	console.log(set[0].id);
	return res.status(200).json(set);
	})

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
	
module.exports = {router}; 