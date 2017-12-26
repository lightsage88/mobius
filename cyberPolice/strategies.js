

const {Strategy: LocalStrategy} = require('passport-local');
const {Strategy: JwtStrategy, ExtractJwt} = require('passport-jwt');


const {Hooman} = require('../hoomans/models');
const {JWT_SECRET} = require('../config');


const localStrategy = new LocalStrategy(function(username, password, callback){
	
	let hooman;
	
	Hooman.findOne({username: username})
		
		.then(function(whatwasFound){
			hooman = whatwasFound;
			if(!hooman) {
				return Promise.reject({
					reason: 'LoginError',
					message: 'Incomplete username or password'
				});
			
			}
			return hooman.validatePassword(password);
		})
		
		.then(function(isValid){
			if(!isValid) {
				return Promise.reject({
					reason: 'LoginError',
					message: 'Incorrect username or password'
				});
			}
			
			return callback(null, hooman);
		})
		.catch(function(err){
			if(err.reason === 'LoginError') {
				
				return callback(null, false, err);
			}
			return callback(err, false);
		})
});


const jwtStrategy = new JwtStrategy(
	{
		secretOrKey: JWT_SECRET,
		jwtFromRequest: ExtractJwt.fromAuthHeaderWithScheme('Bearer'),
		algorithms: ['HS256']
	},
	
	function(payload, done) {
		done(null, payload.hooman);
	}

);



module.exports = {localStrategy, jwtStrategy};