
let deletedCodeForLater = `<div class='inputGroup'>
			<p class='pw'>For Security Reasons,<br>please enter your password:</p>
			<input type='password' name='password' id='password' placeholder='password'>
			</div>`;

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
			$('form').after('<p class="accountCreation">Your account was successfully created</p>');
			$('.accountCreation').fadeOut(2000);
				(setTimeout(function(){
					location.href = 'login.html';
				}, 2000));
		},
		error: (err) => {
			console.log('god damnit');
			console.error(err);
			$('form').after(`<p id='errorFriend'>Something is wrong</p>`);
			$('#errorFriend').fadeOut(2000);
		} 
	});
});

$('#loginForm').submit(function(event){
	event.preventDefault();
	let username = 	$('#username').val();
	let password = $('#password').val();
	$.ajax({
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
	console.log(username);
	console.log(username);
	return new Promise((resolve, reject) => {
		$.ajax({
			method: "GET",
			url: '/api/hoomans',
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

function logOut() {
	$('.logOut').click(function(){
		localStorage.clear();
        setTimeout(function(){
            location.href='index.html';
            }, 3000);
        
	});
    
}


function deleteAccount() {
	$('.deleteAccount').click(function(){
        console.log('fishsticks');
		$('main').append(`
			<div class='superDelete'>
				<p class='question'>Are you sure?</p>
                <br>
				<p class='kill'>Yep</p>
				<p class='reprieve'>Nep</p>
			</div>`);
		$('p.kill').click(function(){
				$.ajax({
					method: "DELETE",
					url: 'api/hoomans',
					data: JSON.stringify({id:localStorage.id}),
					dataType: 'json',
					contentType: 'application/json',
					success: function(){
				$('main').html('');
                $('main').append("<p class='deleteMessage'>Your account has been deleted successfully...returning to beginning</p>");
						setTimeout(function(){
							location.href='index.html';
						}, 3000);
					},
					error: function(xhr, status, err) {
					}
				});
				
			})
		});	
		$('p.reprieve').click(function(){
			location.href='accountPage.html';
		});
}



function upDateAccount() {
	$('.upDateAccount').click(function(){
	console.log('get ready to update your account');
	console.log(localStorage);
	$('.userLegend').html(`
		<form class='updateForm'>
			<h3>Edit your account</h3>
			<div class='inputGroup'>
			<p class='first'>First Name:</p>
			<input type='text' name='firstName' id='firstName' placeholder=${localStorage.firstName} value=${localStorage.firstName}>
			</div>
			<br>
			<div class='inputGroup'>
			<p class='last'>Last Name:</p>
			<input type='text' name='lastName' id='lastName' placeholder=${localStorage.lastName} value=${localStorage.lastName}>
			</div>
			<button type='button'>S A V E</button>
		</form>`);
	($('form.updateForm button').click(function(event){
		event.preventDefault();
		let newFirstName = $('form.updateForm #firstName').val();
		let newLastName = $('form.updateForm #lastName').val();
		let enteredPassword = $('form.updateForm #password').val();

		let username = localStorage.username;
				$.ajax({
					method: "PUT",
					url: '/api/hoomans',
					contentType: 'application/json',
					dataType: 'JSON',
					data: JSON.stringify(
						{
						'firstName':`${newFirstName}`,
						'lastName': `${newLastName}`,
						'password': `${enteredPassword}`,
						'username': `${username}`
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
					}, 1300))
				})
		}))
	})
}


function loadMainPage() {

if(location.href === 'http://localhost:8080/mainPage.html' || 'https://shrouded-anchorage-29615.herokuapp.com/mainPage.html') {
		$.ajax({
			method: "GET",
			url: "/api/hoomans/char",
			headers: {
				contentType: 'application/json',
				username: `${localStorage.username}`
			},
			dataType: 'json'
		})
		.then((response)=>{
			let marvelousData = response.marvelousData;
			let events = [];
			
			
			for(let i=0; i<=marvelousData.length-1; i++) {
                console.log(marvelousData);
                let road = (marvelousData[i].thumbnail.path).slice(7);
                console.log(road);
                
                
				let picPath = 'https://' + road + '.' + marvelousData[i].thumbnail.extension;
                console.log(picPath);
				let namePath = marvelousData[i].name;
				let nameClass = namePath.replace(/\W/g,'');
				$('#outputbox').append(`<div class='characterBox'>
				<img class='characterThumbnail' src=${picPath}>
				<span class='characterName'>${namePath}</span>
				<button class='deleteChar' type='button'>
					<img class='xSymbol' src='assets/images/xSymbol.png'>
				</button>
				<div class='eventBox'>
		          <ul class=${nameClass}></ul>
		        </div> 
				</div>`);

				events = marvelousData[i].events.items;
				let eventList = [];
				for(let x=0; x<=events.length-1; x++) {
					eventList.push(events[x].name);
					
				}
				
			if(eventList.length === 0) {
				console.log('calling Ben Reilly');
				$(`.${nameClass}`).append('<li>No events for this one</li>');
			}	else {
				for(let z=0; z<=eventList.length-1; z++) {
					
					$(`.${nameClass}`).append(`
						<li><a target="blank" href="https://www.amazon.com/s/ref=nb_sb_noss?url=search-alias%3Dstripbooks&field-keywords=marvel ${eventList[z]}">${eventList[z]}</a></li>`);
				}
			}
		}
			$('.deleteChar').click(function(){
		let characterName = $(this).prev()[0].textContent;
		console.log(characterName);
		console.log('deselecting a character');
		$.ajax({
			method: "DELETE",
			url: "/api/hoomans/char",
			data: JSON.stringify({username:localStorage.username,
				characterName: characterName}),
			dataType: "json",
			contentType: "application/json"
		})
		.then(function(response){
			console.log(characterName);
			console.log('merry ep8 was terrible mas');
			console.log(response);
		})
		.then(()=>{
			location.href='mainPage.html';

			})
	});
		})
	}	
}


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
 

function accountFunctionality(){
	logOut();
	deleteAccount();
	upDateAccount();
	loadMainPage();
}


$(accountFunctionality());