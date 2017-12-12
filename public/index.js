
let mLabApiKey = 'pJysmium6S33nXs_wxZ0VK9wyMIQQlSa';
let mLabDb = 'mobius';
let mLabCollection = 'hoomen';


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
				(setTimeout(function(){
					location.href = 'login.html';
				}, 2000));
			//fancy counting function that calls itself, WHUUUUT?!
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
			console.log(response.authToken);
			console.log(username); 
			localStorage.setItem('token', response.authToken);
			getDataFromMlabXXXLoadAccountPage(username);
			toProtectedData();
		},
		error: (response) => {
			console.log('You messed up!');
			$('#loginForm').after('<p class="loginFail">Password/Username Error</p>');
			$('.loginFail').fadeOut(2000);
				
			//I read somewhere you couldn't have both a success and an error callback in the same request...one for Ray.
		}
	// location.href='accountPage.html';
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
		success: (response) =>{
			console.log(response);
		}
	})
	// error: (err) => {
	// 		console.log('just a bump in the road');
	// 		console.error(err);
	// 		$('#loginForm').after('<p>There was a problem with your login credentials');
	// 	}
	
}


//to make get stuff from the database to populate our span tags and
//unordered lists username name bookList
 $('.firstName').html(localStorage.firstName);
 $('.lastName').html(localStorage.lastName);
 $('.username').html(localStorage.username);



function getDataFromMlabXXXLoadAccountPage (username) {
	console.log(username);
	console.log(username);
	return new Promise((resolve, reject) => {
		$.ajax({
			method: "GET",
			// url: `https://api.mlab.com/api/1/databases/mobius/collections/hoomen?q={'username':'${username}'}&apiKey=${mLabApiKey}`,
			url: '/api/hoomans',
			// apiKey: 'pJysmium6S33nXs_wxZ0VK9wyMIQQlSa',
			// query: `{'username':'${username}'}`,
			contentType: 'application/json',
			dataType: 'json'
			})
		//use the backend endpoint for GET
		.then((response)=>{
			console.log(response);
			console.log(username);
			for(let i=0; i<=response.length-1; i++){
				if(response[i].username === username){
					localStorage.setItem('username', response[i].username);
					localStorage.setItem('firstName', response[i].firstName);
					localStorage.setItem('lastName', response[i].lastName);
					localStorage.setItem('id', response[i].id);
				}
			}
			location.href=('accountPage.html');
			resolve();
		});
		// .reject((err) => {
		// 	console.log('dont give up');
		// 	console.error(err);
		// });
	});
}

function logOut() {
	$('button.logOut').click(function(){
		localStorage.clear();
		location.href='index.html';

	})
}


//function to delete account
//1) make a div show up with a superDelete button and asks if user is sure
//2) make everything else go blurry
//3) pressing the button will delete the mLab collection for that user
function deleteAccount() {
	$('button.deleteAccount').click(function(){
		$('main').append(`
			<div class='superDelete'>
				<p>Are you sure?</p>
				<button class='kill'>Yep</button>
				<button class='reprieve'>Nep</button>
			</div>`);
		$('button.kill').click(function(){
			return new Promise((resolve, reject)=>{
				$.ajax({
				method: "GET",
				//Your URL should be a backend API endpoint that uses mongoose to interact with mLab
				url: `https://api.mlab.com/api/1/databases/mobius/collections/hoomen?q=
				{'username':'${localStorage.username}'}&apiKey=${mLabApiKey}`
				})
				.then((response)=>{
					let dBiD = response[0]._id.$oid;
					$.ajax({
						method: "DELETE",
						url: `https://api.mlab.com/api/1/databases/mobius/collections/hoomen/${dBiD}?apiKey=${mLabApiKey}`,
						success: function(data){
							$('main').html("Your account has been deleted successfully...returning to beginning");
							$('p').html('');
							setTimeout(function(){
								location.href='index.html';
							}, 3000);
							resolve();
						},
						error: function(xhr, status, err) {
						}
					});
					
				})
			});
			
		});
		$('button.reprieve').click(function(){
			$('.superDelete').attr('hidden',true);
		});
	});

}

function upDateAccount() {
	$('.upDateAccount').click(function(){
	console.log('get ready to update your account');
	console.log(localStorage);
	$('.userLegend').html(`
		<form class='updateForm'>
			<h3>Edit your account</h3>
			First Name:
			<input type='text' name='firstName' id='firstName' placeholder=${localStorage.firstName} value=${localStorage.firstName}>
			<br>
			Last Name:
			<input type='text' name='lastName' id='lastName' placeholder=${localStorage.lastName} value=${localStorage.lastName}>

			For Security Reasons, please enter your password:
			<input type='password' name='password' id='password' placeholder='password'>
			<button type='button'>Save Changes</button>
		</form>`);
	($('form.updateForm button').click(function(event){
		event.preventDefault();
		let newFirstName = $('form.updateForm #firstName').val();
		console.log(newFirstName);
		let newLastName = $('form.updateForm #lastName').val();
		console.log(newLastName);
		let enteredPassword = $('form.updateForm #password').val();
		console.log(enteredPassword);

		
			console.log(enteredPassword);
				$.ajax({
					method: "PUT",
					url: '/api/hoomans',
					//what is a relative path?
					contentType: 'application/json',
					dataType: 'JSON',
					data: JSON.stringify(
						{
						'firstName':`${newFirstName}`,
						'lastName': `${newLastName}`,
						'password': `${enteredPassword}`
						}
					),
					success: (response) => {
						console.log(response);
					},
					error: (err) => {
						console.log('something is wrong');
						console.error(err);
					}

				})
				.done((response)=>{
					console.log('refreshing soon...');
					console.log(response);
					localStorage.setItem('firstName', response.firstName);
					localStorage.setItem('lastName', response.lastName);
					(setTimeout(function(){
						location.href='accountPage.html';
					}, 0300))
				})
		
	}))
	})
}
// 				.success((response)=> {
// 					console.log('bongochea');
// 								});
// 					}));
// 		})
// }


// // function editAccountSubmit() {
// // 	$('form.updateForm').click(function(event){
// // 		event.preventDefault();
// // 		console.log(event);
// // 	// console.log(newFirstName);
// // 	}) 
// // }



function accountFunctionality(){
	logOut();
	deleteAccount();
	upDateAccount();
	// editAccountSubmit();
}


$(accountFunctionality());

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