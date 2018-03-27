
const chai = require('chai');
const chaiHttp = require('chai-http');
const bodyParser = require('body-parser');
const jsonParser = bodyParser.json();
const should = chai.should;

const {app, runServer, closeServer} = require('../server');

const {User} = require('../users');

const expect = chai.expect;
chai.use(chaiHttp);


describe('/api/users', function(){
	const username = 'TestDummy1' + Math.random();
	const password = 'password';
	const firstName = 'Kevin';
	const lastName = 'McK';
	const id = '5a3484cdcbe57939348da91e';
	const usernameB = 'TestDummy2';
	const passwordB = 'password';
	const firstNameB = 'Sean';
	const lastNameB = 'Carter';
	const idB = '5a34a7938c232a0b1402a7c5';
	const marvelousData = [{
            "id": 1009637,
            "events": {
                "available": 0,
                "collectionURI": "http://gateway.marvel.com/v1/public/characters/1009637/events",
                "items": [],
                "returned": 0
            },
            "thumbnail": {
                "path": "http://i.annihil.us/u/prod/marvel/i/mg/c/10/4c003ab9ed7d6",
                "extension": "jpg"
            },
            "name": "Sunset Bain"
        },
        {
            "id": 1009381,
            "events": {
                "available": 9,
                "collectionURI": "http://gateway.marvel.com/v1/public/characters/1009381/events",
                "items": [
                    {
                        "resourceURI": "http://gateway.marvel.com/v1/public/events/116",
                        "name": "Acts of Vengeance!"
                    },
                    {
                        "resourceURI": "http://gateway.marvel.com/v1/public/events/227",
                        "name": "Age of Apocalypse"
                    },
                    {
                        "resourceURI": "http://gateway.marvel.com/v1/public/events/303",
                        "name": "Age of X"
                    },
                    {
                        "resourceURI": "http://gateway.marvel.com/v1/public/events/233",
                        "name": "Atlantis Attacks"
                    },
                    {
                        "resourceURI": "http://gateway.marvel.com/v1/public/events/240",
                        "name": "Days of Future Present"
                    },
                    {
                        "resourceURI": "http://gateway.marvel.com/v1/public/events/249",
                        "name": "Fatal Attractions"
                    },
                    {
                        "resourceURI": "http://gateway.marvel.com/v1/public/events/299",
                        "name": "Messiah CompleX"
                    },
                    {
                        "resourceURI": "http://gateway.marvel.com/v1/public/events/154",
                        "name": "Onslaught"
                    },
                    {
                        "resourceURI": "http://gateway.marvel.com/v1/public/events/280",
                        "name": "X-Tinction Agenda"
                    }
                ],
                "returned": 9
            },
            "thumbnail": {
                "path": "http://i.annihil.us/u/prod/marvel/i/mg/6/c0/4e7a2148b6e59",
                "extension": "jpg"
            },
            "name": "Jubilee"
        },
        {
            "id": 1009610,
            "events": {
                "available": 34,
                "collectionURI": "http://gateway.marvel.com/v1/public/characters/1009610/events",
                "items": [
                    {
                        "resourceURI": "http://gateway.marvel.com/v1/public/events/116",
                        "name": "Acts of Vengeance!"
                    },
                    {
                        "resourceURI": "http://gateway.marvel.com/v1/public/events/314",
                        "name": "Age of Ultron"
                    },
                    {
                        "resourceURI": "http://gateway.marvel.com/v1/public/events/233",
                        "name": "Atlantis Attacks"
                    },
                    {
                        "resourceURI": "http://gateway.marvel.com/v1/public/events/234",
                        "name": "Avengers Disassembled"
                    },
                    {
                        "resourceURI": "http://gateway.marvel.com/v1/public/events/310",
                        "name": "Avengers VS X-Men"
                    },
                    {
                        "resourceURI": "http://gateway.marvel.com/v1/public/events/296",
                        "name": "Chaos War"
                    },
                    {
                        "resourceURI": "http://gateway.marvel.com/v1/public/events/238",
                        "name": "Civil War"
                    },
                    {
                        "resourceURI": "http://gateway.marvel.com/v1/public/events/318",
                        "name": "Dark Reign"
                    },
                    {
                        "resourceURI": "http://gateway.marvel.com/v1/public/events/240",
                        "name": "Days of Future Present"
                    },
                    {
                        "resourceURI": "http://gateway.marvel.com/v1/public/events/332",
                        "name": "Dead No More: The Clone Conspiracy"
                    },
                    {
                        "resourceURI": "http://gateway.marvel.com/v1/public/events/245",
                        "name": "Enemy of the State"
                    },
                    {
                        "resourceURI": "http://gateway.marvel.com/v1/public/events/246",
                        "name": "Evolutionary War"
                    },
                    {
                        "resourceURI": "http://gateway.marvel.com/v1/public/events/302",
                        "name": "Fear Itself"
                    },
                    {
                        "resourceURI": "http://gateway.marvel.com/v1/public/events/251",
                        "name": "House of M"
                    },
                    {
                        "resourceURI": "http://gateway.marvel.com/v1/public/events/252",
                        "name": "Inferno"
                    },
                    {
                        "resourceURI": "http://gateway.marvel.com/v1/public/events/253",
                        "name": "Infinity Gauntlet"
                    },
                    {
                        "resourceURI": "http://gateway.marvel.com/v1/public/events/255",
                        "name": "Initiative"
                    },
                    {
                        "resourceURI": "http://gateway.marvel.com/v1/public/events/258",
                        "name": "Kraven's Last Hunt"
                    },
                    {
                        "resourceURI": "http://gateway.marvel.com/v1/public/events/151",
                        "name": "Maximum Carnage"
                    },
                    {
                        "resourceURI": "http://gateway.marvel.com/v1/public/events/37",
                        "name": "Maximum Security"
                    }
                ],
                "returned": 20
            },
            "thumbnail": {
                "path": "http://i.annihil.us/u/prod/marvel/i/mg/3/50/526548a343e4b",
                "extension": "jpg"
            },
            "name": "Spider-Man"
        },
        {
            "id": 1009466,
            "events": {
                "available": 15,
                "collectionURI": "http://gateway.marvel.com/v1/public/characters/1009466/events",
                "items": [
                    {
                        "resourceURI": "http://gateway.marvel.com/v1/public/events/116",
                        "name": "Acts of Vengeance!"
                    },
                    {
                        "resourceURI": "http://gateway.marvel.com/v1/public/events/303",
                        "name": "Age of X"
                    },
                    {
                        "resourceURI": "http://gateway.marvel.com/v1/public/events/310",
                        "name": "Avengers VS X-Men"
                    },
                    {
                        "resourceURI": "http://gateway.marvel.com/v1/public/events/238",
                        "name": "Civil War"
                    },
                    {
                        "resourceURI": "http://gateway.marvel.com/v1/public/events/318",
                        "name": "Dark Reign"
                    },
                    {
                        "resourceURI": "http://gateway.marvel.com/v1/public/events/302",
                        "name": "Fear Itself"
                    },
                    {
                        "resourceURI": "http://gateway.marvel.com/v1/public/events/315",
                        "name": "Infinity"
                    },
                    {
                        "resourceURI": "http://gateway.marvel.com/v1/public/events/317",
                        "name": "Inhumanity"
                    },
                    {
                        "resourceURI": "http://gateway.marvel.com/v1/public/events/311",
                        "name": "Marvel NOW!"
                    },
                    {
                        "resourceURI": "http://gateway.marvel.com/v1/public/events/336",
                        "name": "Secret Empire"
                    },
                    {
                        "resourceURI": "http://gateway.marvel.com/v1/public/events/269",
                        "name": "Secret Invasion"
                    },
                    {
                        "resourceURI": "http://gateway.marvel.com/v1/public/events/271",
                        "name": "Secret Wars II"
                    },
                    {
                        "resourceURI": "http://gateway.marvel.com/v1/public/events/309",
                        "name": "Shattered Heroes"
                    },
                    {
                        "resourceURI": "http://gateway.marvel.com/v1/public/events/308",
                        "name": "X-Men: Regenesis"
                    },
                    {
                        "resourceURI": "http://gateway.marvel.com/v1/public/events/306",
                        "name": "X-Men: Schism"
                    }
                ],
                "returned": 15
            },
            "thumbnail": {
                "path": "http://i.annihil.us/u/prod/marvel/i/mg/e/90/50febf4ae101d",
                "extension": "jpg"
            },
            "name": "Namor"
        },
        {
            "id": 1011138,
            "events": {
                "available": 1,
                "collectionURI": "http://gateway.marvel.com/v1/public/characters/1011138/events",
                "items": [
                    {
                        "resourceURI": "http://gateway.marvel.com/v1/public/events/271",
                        "name": "Secret Wars II"
                    }
                ],
                "returned": 1
            },
            "thumbnail": {
                "path": "http://i.annihil.us/u/prod/marvel/i/mg/7/10/528d31df87c49",
                "extension": "jpg"
            },
            "name": "Beyonder"
        },
        {
            "id": 1009268,
            "events": {
                "available": 15,
                "collectionURI": "http://gateway.marvel.com/v1/public/characters/1009268/events",
                "items": [
                    {
                        "resourceURI": "http://gateway.marvel.com/v1/public/events/227",
                        "name": "Age of Apocalypse"
                    },
                    {
                        "resourceURI": "http://gateway.marvel.com/v1/public/events/320",
                        "name": "Axis"
                    },
                    {
                        "resourceURI": "http://gateway.marvel.com/v1/public/events/238",
                        "name": "Civil War"
                    },
                    {
                        "resourceURI": "http://gateway.marvel.com/v1/public/events/318",
                        "name": "Dark Reign"
                    },
                    {
                        "resourceURI": "http://gateway.marvel.com/v1/public/events/302",
                        "name": "Fear Itself"
                    },
                    {
                        "resourceURI": "http://gateway.marvel.com/v1/public/events/251",
                        "name": "House of M"
                    },
                    {
                        "resourceURI": "http://gateway.marvel.com/v1/public/events/334",
                        "name": "Inhumans Vs. X-Men"
                    },
                    {
                        "resourceURI": "http://gateway.marvel.com/v1/public/events/298",
                        "name": "Messiah War"
                    },
                    {
                        "resourceURI": "http://gateway.marvel.com/v1/public/events/319",
                        "name": "Original Sin"
                    },
                    {
                        "resourceURI": "http://gateway.marvel.com/v1/public/events/336",
                        "name": "Secret Empire"
                    },
                    {
                        "resourceURI": "http://gateway.marvel.com/v1/public/events/269",
                        "name": "Secret Invasion"
                    },
                    {
                        "resourceURI": "http://gateway.marvel.com/v1/public/events/309",
                        "name": "Shattered Heroes"
                    },
                    {
                        "resourceURI": "http://gateway.marvel.com/v1/public/events/316",
                        "name": "X-Men: Battle of the Atom"
                    },
                    {
                        "resourceURI": "http://gateway.marvel.com/v1/public/events/308",
                        "name": "X-Men: Regenesis"
                    },
                    {
                        "resourceURI": "http://gateway.marvel.com/v1/public/events/306",
                        "name": "X-Men: Schism"
                    }
                ],
                "returned": 15
            },
            "thumbnail": {
                "path": "http://i.annihil.us/u/prod/marvel/i/mg/9/90/5261a86cacb99",
                "extension": "jpg"
            },
            "name": "Deadpool"
        }];
before(function(){
	return runServer();
});
after(function(){
	return closeServer();
});
beforeEach(function(){
	
});
afterEach(function(){
});

	describe('GET', function(){
		it('should return all User entries', ()=>{
			return chai.request(app)
			.get('/api/users')
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
		.get('/api/users')
		.then(res=>{
			console.log(res.body[0].id);
			killSwitch = res.body[0].id;
			console.log(killSwitch);
			return chai.request(app)
			.delete(`/api/users`)
			.send({'_id': '5a3484cdcbe57939348da91e'})
			.then(res=>{
				expect(res).to.have.status(204);
			});
		});
			

		});
	});
	describe('POST', ()=>{
		it('should create a user',()=>{
			return chai.request(app)
			.post('/api/users')
			.send({username, password, firstName, lastName})
			.then((res)=>{
				expect(res).to.have.status(201);
	            expect(res.body).to.be.an('object');
	            expect(res.body).to.include.keys(
	              'username',
	              'firstName',
	              'lastName',
	              'id'
	            );
			})
			.catch((err)=>{
				console.error(err);
				console.log(err);
				if(err instanceof chai.AssertionError) {
					throw err;
				}
			})
		});
	});

	describe('PUT', ()=>{
		it('should update a user', ()=>{
			return chai.request(app)
			.put('/api/users')
			.send({username, firstName, lastName, password})
			.then((res)=>{
				console.log(res.body);
				expect(res).to.have.status(202);
				expect(res.body).to.be.an('object');
				expect(res.body).should.include.keys(
					'username',
					'firstName',
					'lastName',
					'id'
					);
			})
			.catch((err)=>{
				console.error(err);
				console.log(err);
				if(err instanceof chai.AssertionError) {
					throw err;
				}
			});
		});
	});

	describe('Put/char', ()=>{
		it('should update the characters in a users screen', ()=>{
			return chai.request(app)
			.put('/api/users/char')
			.send({username, marvelousData})
			.then((res)=>{
				console.log('retrospectives make you feel old, but cool');
				console.log(res);
				console.log(res.body);
				expect(res).to.have.status(202);
			})
			.catch((err)=>{
				console.error(err);
				console.log(err);
				if(err instanceof chai.AssertionError) {
					throw err;
				}
			})
		})
	});

	describe('GET/char', ()=>{
		it('should get out one particular user..seems redundant', ()=>{
			return chai.request(app)
			.get('/api/users/char')
			.send({username})
			.then((res)=>{
				console.log('this seems like a redundant one that I must have written while sleeping');
				console.log(res);
				expect(res).to.have.status(200);
			})
			.catch((err)=>{
				console.error(err);
				console.log(err);
				if(err instanceof chai.AssertionError) {
					throw err;
				}
			})
		})
	});
});











