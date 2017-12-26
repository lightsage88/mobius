
const bcrypt = require('bcryptjs');

const mongoose = require('mongoose');
mongoose.Promise = global.Promise;


const HoomanSchema = mongoose.Schema({
	
	username: {
		type: String,
		required: true,
		unique: true
	},
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
	},
	marvelousData: Array
	
});

HoomanSchema.methods.apiRepr = function () {
	return {
		username: this.username || '',
		firstName: this.firstName || '',
		lastName: this.lastName || '',
		id: this.id,
		marvelousData: this.marvelousData
	};
};


HoomanSchema.methods.validatePassword = function(password) {
	return bcrypt.compare(password, this.password);
};


HoomanSchema.statics.hashPassword = function(password) {
	return bcrypt.hash(password, 10);
};

const Hooman = mongoose.model('Hooman', HoomanSchema);

module.exports = {Hooman};