'use strict'
require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const morgan = require('morgan');
const passport = require('passport');
const bodyParser = require('body-parser');



const {router: userRouter} = require('./users');
const {router: authRouter, localStrategy, jwtStrategy} = require('./auth');



mongoose.Promise = global.Promise;


const {PORT, DATABASE_URL} = require('./config');

const app = express();

app.use(express.static('public'))


app.use(morgan('common'));



app.use(function(req, res, next) {
	req.header('Access-Control-Allow-Origin', '*');
	res.header('Access-Control-Allow-Origin', '*');
	req.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
	res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
	req.header('Access-Control-Allow-Methods', 'GET');
	res.header('Access-Control-Allow-Methods', 'GET,POST,PUT,PATCH,DELETE');

	next();
});



passport.use(localStrategy);
passport.use(jwtStrategy);

app.use('/api/users', userRouter);
app.use('/api/auth/', authRouter);


const jwtAuth = passport.authenticate('jwt', {session:false});


app.get('/api/vault', jwtAuth, (req, res)=>{
	return res.json({
		data: 'Blue stays TRU, Crip 4 LIFE'
	});
});





app.use('*', (req, res)=>{
	return res.status(404).json({message: 'Mang, that shit dont exist'});
});


let server;


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



if(require.main === module) {
	runServer().catch(err => console.error(err));
}


module.exports = {app, runServer, closeServer};
