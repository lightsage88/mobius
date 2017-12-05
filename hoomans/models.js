//bcrypt is an encryption package that we will use to hash and validate passwords
//that Hoomans will set up
const bcrypt = require('bcryptjs');
//we establish that mongoose will come into play with this so that we can
//play with databases
const mongoose = require('mongoose');
//mongoose will work with built in Promise nature from JS
mongoose.Promise = global.Promise;

//here we set up how the data will be structured for our API with the help
//of Schema, a method of Mongoose, aptly named to help us structure our information
const HoomanSchema = mongoose.Schema({
	//the various parts in the API will be defined through objects which will have
	//keys referring to various aspects of the data, with values giving us more info
	//such as dataType and whether they are required for a successful entry
	
//obviously we need a userName for each Hooman and they will need to be present,
//a string, and different from anyone elses.
	username: {
		type: String,
		required: true,
		unique: true
	},
//similar criteria are established for passwords and firstNames and lastNames
	password: {
		type: String,
		required: true
	},
	firstName: {
		type: String,
		default: ''
	},
	lastName: {
		type: String,
		default: ''
	}
});