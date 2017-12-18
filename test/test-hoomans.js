//we're going to omit strict mode for shits and giggles
//we set the global.DATABASE_URL as:
//'mongod://localhost/mobius-test';
//we set up a db called mobius-test and it has a collection
//called hoomans which has some entries in it
global.DATABASE_URL = 'mongodb://localhost/mobius-test';
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
	const username = 'TestDummy1';
	const password = 'password';
	const firstName = 'Kevin';
	const lastName = 'McK';
	const id = '5a3484cdcbe57939348da91e';
	const usernameB = 'TestDummy2';
	const passwordB = 'password';
	const firstNameB = 'Sean';
	const lastNameB = 'Carter';
	const idB = '5a34a7938c232a0b1402a7c5';
before(function(){
	return runServer();
});
after(function(){
	return closeServer();
});
beforeEach(function(){
	// let user = {_id:"5a34a7938c232a0b1402a7c5",username:"TestDummy2",password:"$2a$10$vdiqrLVopZhn9boIxPWSaONl2iDYzbWKgmLI6ScKHeE5lenyDaOFO",marvelousData:[{"id":1012295,"events":{"available":0,"collectionURI":"http://gateway.marvel.com/v1/public/characters/1012295/events","items":[],"returned":0},"thumbnail":{"path":"http://i.annihil.us/u/prod/marvel/i/mg/6/40/531771a14fcf6","extension":"jpg"},"name":"Spider-Man (Noir)"}],lastName:"Carter",firstName:"Sean",__v:0};

	// return Hooman.insertOne({_id:"5a34a7938c232a0b1402a7c5",username:"TestDummy2",password:"$2a$10$vdiqrLVopZhn9boIxPWSaONl2iDYzbWKgmLI6ScKHeE5lenyDaOFO",marvelousData:[{"id":1012295,"events":{"available":0,"collectionURI":"http://gateway.marvel.com/v1/public/characters/1012295/events","items":[],"returned":0},"thumbnail":{"path":"http://i.annihil.us/u/prod/marvel/i/mg/6/40/531771a14fcf6","extension":"jpg"},"name":"Spider-Man (Noir)"}],lastName:"Carter",firstName:"Sean",__v:0});
});
afterEach(function(){
	// return Hooman.remove({});
});

describe('/api/hoomans', function(){
	describe('GET', function(){
		it('should return all Hooman entries', ()=>{
			return chai.request(app)
			.get('/api/hoomans')
			.then(res=> {
				console.log(res.body);
				expect(res).to.have.status(200);
				expect(res.body).to.be.an('array');
			});
		});
	});

	describe('DELETE', function(){
	
		it('should delete a specific user', ()=>{
		return chai.request(app)
		.get('/api/hoomans')
		.then(res=>{
			console.log(res.body[0].id);
			killSwitch = res.body[0].id;
			console.log(killSwitch);
			return chai.request(app)
			.delete(`/api/hoomans`)
			.set({'_id': '5a3484cdcbe57939348da91e'})
			.then(res=>{
				expect(res).to.have.status(204);
			});
		});
			

		});
	});


	});
});












