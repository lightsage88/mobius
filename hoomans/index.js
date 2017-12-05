//we establish via destructuring assignments, that Hooman and router will need
//info to be taken from the models and router file in this directory
const {Hooman} = require('./models');
const {router} = require('./router');

//we export Hooman and router for our use throughout the file tree
module.exports = {Hooman, router};