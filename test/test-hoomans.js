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