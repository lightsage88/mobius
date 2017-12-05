//here we are setting up the necessary middleware to process and parse data
//in the JSON Javascript Object Notation format
const jsonParser = bodyParser.json();

//here we set up the api/hoomans/ endpoint with a POST method
//this is to set up a NEW HOOMAN, user

//a post request is sent to any* endpoint, we use jsonParser to
//parse the data that is submitted by the client, we have our trusty
//anon function with the request and result object passed in
router.post('/', jsonParser, function(req, res){
//first we established a var of requiredFields to be an array of
// 'username' and 'password'...we're going to make it so that these NEED
//to be present in the request object
	const requiredFields = ['username', 'password'];
//we set the variable missingField to equal the use of the find method
//employing an anonymous function to search for a given field, the passed
//in argument could be 'turkey' or 'sonic' in the requiredFields inside
//the request object body.
	const missingField = requiredFields.find(function(field){
		//it searches through each field/turkey in the request object body
		//and will return a true if there is something missing per line 23--following line
		return !(field in req.body);
	});
	//here is where the consequence of having a true for missingField comes
	//into play
	//if missingField returns true from the above method/function combo, then
	//we return a 422 status code and a json object to the client with an object
	//like structure which sends over the code: 422, the reason: 'ValidationError',
	//message: 'Missing field', and location: missingField (a reference to the 
	//missingField variable whose evaluation as TRUE was necessary for this block
	//to run in the first place)
	if (missingField) {
		return res.status(422).json({
			code: 422,
			reason: 'ValidationError',
			message: 'Missing field',
			location: missingField
		});
	}
//the following runs if we manage to pass the first hurdle of proving that 
//we lack any missingField variables that can evaluate as TRUE
//Now we are tackling whether or not the requiredFields are indeed strings
	const stringFields = ['user', 'password', 'firstName', 'lastName'];
	//we set the variable nonStringField to equal the find method grouped with
	//an anon function taking a field/turkey as its argument. It will return,
	//as a boolean for nonStringField, the evaluation of there being a field/turkey
	//key in the request.body (which we will want to be true) AND that key's
	//data type not being a 'String' (Which we Do NOT want). 
	//the evaluation of this works like multiplying a negative number by a positive
	//number, you'll end up with a negative one and seeing as how nonStringField, in the
	//following block, being TRUE will throw an error, we want the frist half of the 
	//function's block to be true and for the typeof the field not being a string to be false...
	//because we DO want a string there. :p
	const nonStringField = stringFields.find(function(field){
		return field in req.body && typeof req.body[field] !== 'string';
	});
//here, we see a return to the strategy used about two paragraphs above in which
//the TRUEness/presence of a variable defined by a test for something amiss returning
//as true causes an error to be thrown
	if (nonStringField) {
		return res.status(422).json({
			code: 422,
			reason: 'ValidationError',
			message: 'Incorrect field type: you were supposed to input a string',
			location: nonStringField
		});
	}
//Old people and fat fingered people have trouble typing. It happens to me all
//the time. Sometimes you're going to hit space when you don't mean to while defining
//sensitive login credentials like passwords or usernames. This will help clean that
//stuff up.

//we define 'explicitlyTrimmedFields' to equal an array with values of 'username' and 'password'
	const explicitlyTrimmedFields = ['username','password'];
//we define 'nonTrimmedField' as the find method with an anon func searching for
//a field/turkey.
//It will return the evaluation of the explicitlyTrimmedFields being found in the 
//request object body and having the trim() method [which deletes any whitespaces] run on it
//and then seeing if that is NOTequal to the same things without the trim() method run on it.
//if it is equal, then nonTrimmedField becomes 'TRUE' and then we throw an error much like
//we have done above two times already
	const nonTrimmedField = explicitlyTrimmedFields.find(function(turkey){
		return req.body[turkey].trim() !== req.body(turkey);
	});
//Now if nonTrimmedField has a value of 'true', we return, yet again, the same kind of
//error as above, but with a slightly different message, reflected the presence of 
//white spaces, and how that is a problem and point the location of the error to be
//the variable 'nonTrimmedField'
	if(nonTrimmedField) {
		return res.status(422).json({
			code: 422,
			reason: 'ValidationError',
			message: 'You have heavy thumbs and included spaces where they should not have been',
			location: nonTrimmedField
		});
	}
//Now we will being dealing with security issues and such. We're to define an object
//called sizedFields and it will contain objects which contain keys of min and max.
//these values will reflect how long or short we will want usernames and passwords to be
//and their limits
const sizedFields = {
	username: {
		min: 1
	},
	password : {
		//bcrypt, which will be doing out password hashing for security,
		//truncates data given to it after 72 characters, so you could reasonably
		//protect a password up to 72 chars in length
		min: 6,
		max: 20
	}
};
//We set the var tooSmallField to equal the evaluation of 
//sizedFields' keys being scoured to find its keys...now while sizedFields
//is an object housing other objects (username and password), given their relationship
//they are considered to be 'keys', though in the classical sense, the keys are
//the instances of min and max
//At any rate we want to find look into the inner objects[~keys] of sizedFields
//and search for the presence of 'min' as a key for either username or password
// we want that part to return as true, then we evaluate ASWELL due to &&
//whether or not the request object's body's version of ('min', kirby) has a length
//that is smaller than the value set by sizedFields[kirby/username or password].min
//if the request body's version is too small, we return True as well...and then
//we have a TRUE value for tooSmallField...which will throw an error soon.
const tooSmallField = Object.keys(sizedFields).find(function(kirby){
	return 'min' in sizedFields[kirby] &&
			req.body[kirby].trim().length < sizedFields[kirby].min;
});
//but first...the search for things that are TOO BIIIIIG
//in botht hese cases, deDede and kirby will be replaced with
//username or password as the function cycles through the contents of the
//sizedFields and finds 'max' or 'min' in the sizedFields 'keys', which are
//techincally objects under its dominion.
const tooLargeField = Object.keys(sizedFields).find(function(deDede){
	return 'max' in sizedFields[deDede] &&
			req.body[deDede].trim().length > sizedFields[deDede].max;
});

})