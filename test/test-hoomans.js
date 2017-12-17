//we're going to omit strict mode for shits and giggles
//we set the global.DATABASE_URL as:
//'mongod://localhost/mobius-test';
//we set up a db called mobius-test and it has a collection
//called hoomans which has some entries in it
global.DATABASE_URL = 'mongod://localhost/mobius-test';
//for these tests we are going to need chai and chaiHttp
const chai = require('chai');
const chaiHttp = require('chai-http');

//we will use destructuring assignments to refer
//to app, the runServer function, and the closeServer
//function and say that we will require (''../server)
//the server.js file
const {app, runServer, closeServer} = require('../server');
//here we will use a destructuring assignment
//to make Hooman require the hoomans folder.
//????it can be either a folder
const {Hooman} = require('../hoomans');
//we are going to be using a method of chai called 'expect',
//for ease, we will simply create a constant variable called
//'expect' and make it refer to that method of chai
const expect = chai.expect;
//chai-http lets us make HTTP requests in our tests
chai.use(chaiHttp);

//now we get to the actual describe

describe('/api/hoomans', function(){
	const username = 'exampleUser';
	const password = 'examplePass';
	const firstName = 'Example';
	const lastName = 'User';
	const usernameB = 'exampleUserB';
	const passwordB = 'examplePassB';
	const firstNameB = 'ExampleB';
	const lastNameB = 'UserB';
before(function(){
	return runServer();
});
after(function(){
	return closeServer();
});
beforeEach(function(){});
afterEach(function(){
	return Hooman.remove({});
});

describe('/api/hoomans', function(){
	describe('GET', function(){
		it('should return all Hooman entries', ()=>{
			return chai.request(app).get('/api/hoomans')
			.then(res=> {
				expect(res).to.have.status(200);
				expect(res.body).to.be.an('array');
			});
		});
	});
});


});


// router.get('/', function(req, res){
// 	return Hooman.find()
// 	//says to find all the Hooman entries
// 	.then(function(hoomans){
// 	// console.log(hoomans);
// 	let set = [];
// 	for(let i=0; i<=hoomans.length-1; i++){
// 		set.push(hoomans[i].apiRepr());
// 	}
// 	// console.log(set);
// 	return res.status(200).json(set);
// 	})
// 	//if there is an error, we will send a very basic message back in jSON
// 	//and return a status code of 500
// 	.catch(function(err){
// 		return res.status(500).json({message: 'Internal server screwup'});
// 	});
// });
