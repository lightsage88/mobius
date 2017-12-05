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
	//we will want to add books we are searching for here later
});
//here wea re defining the method of apiRepr, which stands for api representation
//which will determine WHAT the client will see on a successful get request and
//what the other endpoints will be dealing with regarding other requests
HoomanSchema.methods.apiRepr = function () {
	return {
		username: this.username || '';
		firstName: this.firstName || '';
		lastName: this.lastName || '';
	};
};

//here we are defining the method of validatePassword. It will take, as an argument
//data which is supposed to represent the password for a users account. It will 
//use the middleware of bcrypt to compare the value of the passed in argument against
//the actual password that was set up with the creation of a given account
HoomanSchema.methods.validatePassword = function(password) {
	return bcrypt.compare(password, this.password);
};

//static methods belong to the WHOLE class, not just the instance of a particular
//object belonging to the class. Instantiated objects have member variables that
//influence their behavior. When the instance has its method executed, the method will
//refer to these variables.
//However, all objects of a particular type might have behavior or need a behavior taht
//is not dependent on member variables/other moving parts. These methods are best made
// 'static'. By being static, no instance of the class is required to run that method
//in our case, our password is going to need to be secure no matter what, so we will
//be encrypting it like so: :)
HoomanSchema.statics.hashPassword = function(password) {
	return bcrypt.hash(password, 10);
};

const Hooman = mongoose.model('Hooman', HoomanSchema);

module.exports = {Hooman};