
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
			console.log(username); 
			localStorage.setItem('token', response.authToken);
			toProtectedData();
			getDataFromMlabXXXLoadAccountPage(username);
		}//I read somewhere you couldn't have both a success and an error callback in the same request...one for Ray.
	});
	// location.href='accountPage.html';
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
		done: function(response) {
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
 $('.firstName').html(localStorage.firstName);
 $('.username').html(localStorage.username);



function getDataFromMlabXXXLoadAccountPage (username) {
	console.log(username);
	console.log(username);
	return new Promise((resolve, reject) => {
		$.ajax({
			method: "GET",
			url: `https://api.mlab.com/api/1/databases/mobius/collections/hoomen?q={'username':'${username}'}&apiKey=${mLabApiKey}`,
			})
		.done((response)=>{
			console.log('hooray!');
			console.log(response);

		})
		.then((response)=>{
			console.log(response[0].username);			
			localStorage.setItem('username', response[0].username);
			localStorage.setItem('firstName', response[0].firstName);
			localStorage.setItem('lastName', response[0].lastName);
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
	console.log(localStorage);
	$('button.deleteAccount').click(function(){
		console.log('trying to delete');
		$('main').append(`
			<div class='superDelete'>
				<p>Are you sure?</p>
				<button class='kill'>Yep</button>
				<button class='reprieve'>Nep</button>
			</div>`);
		$('button.kill').click(function(){
			console.log('here I go killing again');
			return new Promise((resolve, reject)=>{
				$.ajax({
				method: "GET",
				url: `https://api.mlab.com/api/1/databases/mobius/collections/hoomen?q=
				{'username':'${localStorage.username}'}&apiKey=${mLabApiKey}`
				})
				.then((response)=>{
					let dBiD = response[0]._id.$oid;
					console.log(dBiD);
					$.ajax({
						method: "DELETE",
						url: `https://api.mlab.com/api/1/databases/mobius/collections/hoomen/${dBiD}?apiKey=${mLabApiKey}`,
						success: function(data){
							console.log('You are out of the club');
							$('main').html("Your account has been deleted successfully...returning to beginning");
							$('p').html('');
							setTimeout(function(){
								location.href='index.html';
							}, 3000);
						},
						error: function(xhr, status, err) {
						}
					});
					
				})
			});
			
		});
	});

}



function accountFunctionality(){
	logOut();
	deleteAccount();
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