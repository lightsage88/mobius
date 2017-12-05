//omitting use strict mode for experimentational purposes
//we will require .env to store secret information for the
//JWTokens. the .env file should ONLY be in the server.
require('dotenv').config();

//below are the different packages we will be depending on
const express = require('express');
const mongoose = require('mongoose');
const morgan = require('morgan');
const passport = require('passport');

//we will also be adding a .gitignore file to the git.
//the .gitignore will have node_modules/ in it...just as
//it is on line 13.

//here we will use DESTRUCTURING ASSIGNMENTS so that we can
//refer to 'router' as it will exist in the /users directory
//and in the /auth directory

const {router: hoomanRouter} = require('./hoomans');
const {router: policeRouter, localStrategy, jwtStrategy} = require('./cyberPolice');

//we're setting up mongoose to use the built in javascript
//promise model

mongoose.Promise = global.Promise;

//we are setting this up so that when we use the variables
//PORT and DATABASE_URL we will make sure that they are
//pulled from the config.js document
const {PORT, DATABASE_URL} = require('./config');

//the app is an express app.
const app = express();

//for our logging purposes, we will use Morgan
	//moreover, we will use the common set up from Morgan
app.use(morgan('common'));

//CORS (Cross Origin Resource Sharing)
//This allows for information to be selected from more than
//one resource
//Here we are basically setting up HTTP headers for various
//HTTP methods that will allow us to have this kind of freedom
//from where we receive information from and where we send it to.

app.use(function(req, res, next) {
//lets the origins be *, meaning ANYTHING	
	res.header('Access-Control-Allow-Origin', '*');
//defines the headers that will work with CORS, Content-Type & Authorization	
	res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
//defines the methods that will work with CORS
	res.header('Access-Control-Allow-Methods', 'GET,POST,PUT,PATCH,DELETE');
//sets up an if loop that states that if the req.method presented is 'OPTIONS'
//we will return the response object with a status code of '204'
	if(req.method === 'OPTIONS') {
		return res.send(204);
	}
	//HOwever, if we don't send a 204, then we just call next and the 
	//following middleware will be used in this file
	next();
});

//we state that we will be using passport and that passport will be using 
//localStrategy and jwtStrategy, which we will define on strategies.js

passport.use(localStrategy);
passport.use(jwtStrategy);
//we state that the app is going to use, whenever anyone makes a request to
//an endpoint that includes /api/users/ that we are going to refer to rules
//and features set up in the usersRouter file.
//this is referenced up on like 20.
app.use('/api/hoomans', hoomanRouter);
//similar deal but for /api/auth/  but it uses the authRouter file.
app.use('/api/cyberPolice/', policeRouter);

//here, we set up a variable to represent a method of the passport package
//so that when we are dealing with jsonwebTokens, we use this particular
//strategy to deal with its creation/validation
const jwtAuth = passport.authenticate('jwt', {session:false});

//we define an endpoint on this server and say that we need
//a valid jsonWebToken for someone to access it, the method set to
//a variable on line 80 will be passed in to the .GET method.
//by default, it will go to a SUCCESSFUL implementation of the strategy
//being integreated with passport. jwtAuth will have built in safeguards
//on how to manage errors and such should they arise, but they aren't
//displayed here.
app.get('/api/vault', jwtAuth, (req, res)=>{
	return res.json({
		//this is filler information for now
		data: 'Blue stays TRU, Crip 4 LIFE'
	});
});

//the * in this context refers to any endpoint that has
//not been created in this application, like '/pigshit' or
// '/sonicBlood'...if you search for something that does not
//exist, you will instantly get a 404 status code
//and an error message that will be send as json

app.use('*', (res, res)=>{
	return res.status(404).json({message: 'Mang, that shit dont exist'});
});

//below we establish a variable 'server' which has no value. it is
//established this way so that subsequent blocks of code that include
//methods which rely on mongoose to connect to databases can have 
//a stand in variable that is readily within scope.

let server;

//here we set up the 'runServer' function which will return a Promise. If there are problems
//reject will be returned with an (err) code, if not, we will resolve with
//the connection to the server being established

// function runServer() {
// 	return new Promise((resolve, reject) => {
// 		mongoose.connect(DATABASE_URL, {useMongoClient: true}, err =>{
// 				if(err) {
// 					return reject(err);
// 				}
// 			server = app.listen(PORT, () => {
// 				console.log(`Your joint is cripping on port ${PORT}`);
// 				resolve();
// 			})
// 			.on('error', err => {
// 					mongoose.disconnect();
// 					reject(err);
// 			});

// 		});
// 	});
// }

//this is a classic function declaration style of the above runServer function...it MAY not work...but regardless
//it will serve as a wonderful educational tool!
function runServer() {
	return new Promise(function(resolve, reject){
		mongoose.connect(DATABASE_URL, {userMongoClient: true}, function(err){
			if(err){
				return reject(err);
			}
			server = app.listen(PORT, function(){
				console.log(`Your shit is cripping on port ${PORT}`);
				resolve();
			})
			.on('error', function(err){
				mongoose.disconnect();
				reject(err);
			});
		});
	});
}
//this is a closeServer function and it is going to use a mongoose.disconnect method and then 
//chain a .then method onto it, which will segway into a function that will return a Promise
//the promise is set up so that the server we defined on line 111 will be closed and then the promise
//will resolve. an IF loop will be utilized to return a reject of any err that may occur
// function closeServer() {
// 	return mongoose.disconnect().then(()=>{
// 		return new Promise((resolve, reject) => {
// 			console.log('Shutting the shit down');
// 			server.close( err => {
// 				if(err) {
// 					return reject(err);
// 				}
// 			resolve();
// 			});
// 		});
// 	});
// }

//here is a classic function delcaration of the above function closeServer()
function closeServer() {
	return mongoose.disconnect().then(function(){
		return new Promise(function(resolve, reject){
			console.log('waltzing away');
			server.close(function(err){
				if(err) {
					reject(err);
				}
			resolve();
			});
		});
	});
}

//this statement makes it so that if anything but the server.js file is issuing commands,
//say like a module is trying to run the shots as opposed to simply being an appendage, we will
//throw an error

if(require.main === module) {
	runServer().catch(err => console.error(err));
}

//here we export certain variables that will be dependences for modules and such to do their jobs

module.exports = {app, runServer, closeServer};
