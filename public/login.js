$('#loginForm').submit(function(event){
	event.preventDefault();
	let username = 	$('#username').val();
	let password = $('#password').val();
	$.ajax({
		method: "POST",
		url: "/api/auth/login",
		data: JSON.stringify({username: username, password: password}),
		contentType: "application/json",
		dataType: 'json',
		success: (response) => {
			localStorage.setItem('token', response.authToken);
			getDataFromMlabXXXLoadAccountPage(username);
			
 $('.firstName').html(localStorage.firstName);
 $('.lastName').html(localStorage.lastName);
 $('.username').html(localStorage.username);


			toProtectedData();
		},
		error: (response) => {
			$('main').append('<p class="loginFail">Password/Username Error</p>');
			$('.loginFail').fadeOut(2000);

		}
	});
});

function toProtectedData() {
	let token = localStorage.getItem('token');
	$.ajax({
		method: "GET",
		url: "/api/vault",
		headers:{
		contentType: 'application/json',
		cacheControl: 'no-cache',
		authorization: `Bearer ${token}`
		},
		dataType: 'json',
		then: (response) =>{
			console.log(response);
		}
	})	
}

 $('.firstName').html(localStorage.firstName);
 $('.lastName').html(localStorage.lastName);
 $('.username').html(localStorage.username);





function getDataFromMlabXXXLoadAccountPage (username) {

	return new Promise((resolve, reject) => {
		$.ajax({
			method: "GET",
			url: '/api/users',
			contentType: 'application/json',
			dataType: 'json'
			})
		.then((response)=>{
			console.log(username);
			for(let i=0; i<=response.length-1; i++){
				if(response[i].username === username){
					localStorage.setItem('username', response[i].username);
					localStorage.setItem('firstName', response[i].firstName);
					localStorage.setItem('lastName', response[i].lastName);
					localStorage.setItem('id', response[i].id);
				}
			}
			location.href=('mainPage.html');
			resolve();
		});
	});
}