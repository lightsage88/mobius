

$('#registerForm').submit(function(event){
	event.preventDefault();
	let username = $('#username').val();
	let password = $('#password').val();
	let firstName = $('#firstName').val();
	let lastName = $('#lastName').val();
	console.log('Super Mario is a friend');
	console.log(username);
	console.log(password);
	console.log(firstName);
	console.log(lastName);
	$.ajax({
		method: "POST",
		url: "/api/hoomans",
		data: JSON.stringify({username: username, password: password, firstName: firstName, lastName: lastName}),
      	contentType: 'application/json',
      	dataType: 'json', 
		success: (response) => {
			console.log(response);
			$('#registerForm').after('<p class="accountCreation">Your account was successfully created</p>');
			$('.accountCreation').fadeOut(2000);
			//insert reference to a function that will countdown to logging them in with
			//their credentials.
		},
		error: (err) => {
			console.log('god damnit');
			console.error(err);
			//can use jquery to put the error into some html element in your document
			$('main').append(`${err.responseJSON.message}`);
		} 
	});
});

$('#loginForm').submit(function(event){
	event.preventDefault();
	let username = 	$('#username').val();
	let password = $('#password').val();
	console.log('Batman never quits and neither should you!');
	$.ajax({
		//method url data contentType dataType success and error
		method: "POST",
		url: "/api/cyberPolice/login",
		data: JSON.stringify({username: username, password: password}),
		contentType: "application/json",
		dataType: 'json',
		success: (response) => {
			console.log('cooking up authToken');
			console.log(response);
			console.log(username); 
			localStorage.setItem('token', response.authToken);
			toProtectedData();
			getDataFromMlab(username);
<<<<<<< HEAD
			location.href='accountPage.html';
=======
			
			// location.href='accountPage.html';
>>>>>>> 2c40044c6cf87988a98be5fa2f82ea4608926adf
			//add something taking the user to the protected data stuff
		},
		error: (err) => {
			console.log('Keep trying, homes');
			console.error(err);
			$('main').append(`${err.responseJSON.message}`);
		}
	});
});

function toProtectedData() {
	let token = localStorage.getItem('token');
	console.log(token);
	$.ajax({
		method: "GET",
		url: "/api/vault",
		headers:{
		contentType: 'application/json',
		authorization: `Bearer ${token}`
	},
		dataType: 'json',
		success: function(response) {
			console.log(response.data)
		},
		error: (err) => {
			console.log('just a bump in the road');
			console.error(err);
			$('#loginForm').after('<p>There was a problem with your login credentials');
		}
	}); 
}


//to make get stuff from the database to populate our span tags and
//unordered lists username name bookList
<<<<<<< HEAD
 $('.username').html(sessionStorage.firstName);
=======
// $('.username').html();
>>>>>>> 2c40044c6cf87988a98be5fa2f82ea4608926adf

let mLabApiKey = 'pJysmium6S33nXs_wxZ0VK9wyMIQQlSa';
let mLabDb = 'mobius';
let mLabCollection = 'hoomen';

function getDataFromMlab (username) {
	console.log(username);
	console.log(username);
	return new Promise((resolve, reject) => {
		$.ajax({
			method: "GET",
			url: `https://api.mlab.com/api/1/databases/mobius/collections/hoomen?q={'username': '${username}'}&apiKey=${mLabApiKey}`,
			contentType: 'application/json;charset=utf-8',
			})
		.done((response)=>{
			console.log('hooray!');
			console.log(response);
<<<<<<< HEAD
=======
			
>>>>>>> 2c40044c6cf87988a98be5fa2f82ea4608926adf
		})
		.then((response)=>{
			console.log(response[0].username);			
			sessionStorage.setItem('username', response[0].username);
			sessionStorage.setItem('firstName', response[0].firstName);
			sessionStorage.setItem('lastName', response[0].lastName);
		})
		// .reject((err) => {
		// 	console.log('dont give up');
		// 	console.error(err);
		// });
	});
}

//https://api.mlab.com/api/1/databases/mobius/collections/hoomen?q={'username': lightsage88&apiKey=hKWiRGd3vrdDNeevRH9itVTSpdHc_Ldt
// //for alogin form the success response => {
// 	localStorage.setItem('token', response.authToken) 
// }


// //protected endpoint
// let token = localStorage.getItem('token');
// //send this in the header of the request as 'Bearer'
// header: {
// 	contentType: 'application/json',
// 	authorization: `Bearer ${token}`
// }