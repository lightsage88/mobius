//we're going to omit strict mode for shits and giggles
//we set the global.DATABASE_URL as:
//'mongod://localhost/mobius-test';
//we set up a db called mobius-test and it has a collection
//called hoomans which has some entries in it
global.DATABASE_URL = 'mongod://localhost/mobius-test';
//for these tests we are going to need chai and chaiHttp
const chai = require('chai');
const chaiHttp = require('chai-http');