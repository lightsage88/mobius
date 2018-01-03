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




// function loadMainPage() {


// if(location.href === 'http://localhost:8080/mainPage.html' || 'https://shrouded-anchorage-29615.herokuapp.com/mainPage.html') {
// 	console.log('bloods');
// 	console.log(location.href);
// 	if((localStorage.getItem('username') === null || undefined) && (location.href === 'http://localhost:8080/mainPage.html' || 'https://shrouded-anchorage-29615.herokuapp.com/mainPage.html')) {
// 		console.log('crips');
// 		window.location = 'index.html';
// 	} else {

// 		$.ajax({
// 			method: "GET",
// 			url: "/api/hoomans/char",
// 			headers: {
// 				contentType: 'application/json',
// 				username: `${localStorage.username}`
// 			},
// 			dataType: 'json'
// 		})
// 		.then((response)=>{
// 			let marvelousData = response.marvelousData;
// 			let events = [];
			
			
// 			for(let i=0; i<=marvelousData.length-1; i++) {
//                 let road = (marvelousData[i].thumbnail.path).slice(7);
                
                
// 				let picPath = 'https://' + road + '.' + marvelousData[i].thumbnail.extension;
// 				let namePath = marvelousData[i].name;
// 				let nameClass = namePath.replace(/\W/g,'');
// 				$('#outputbox').append(`<div class='characterBox'>
// 				<img class='characterThumbnail' src=${picPath}>
// 				<span class='characterName'>${namePath}</span>
// 				<button class='deleteChar' type='button'>
// 					<img class='xSymbol' src='assets/images/xSymbol.png'>
// 				</button>
// 				<div class='eventBox'>
// 		          <ul class=${nameClass}></ul>
// 		        </div> 
// 				</div>`);

// 				events = marvelousData[i].events.items;
// 				let eventList = [];
// 				for(let x=0; x<=events.length-1; x++) {
// 					eventList.push(events[x].name);
					
// 				}
				
// 			if(eventList.length === 0) {
// 				$(`.${nameClass}`).append('<li>No events for this one</li>');
// 			}	else {
// 				for(let z=0; z<=eventList.length-1; z++) {
					
// 					$(`.${nameClass}`).append(`
// 						<li><a target="blank" href="https://www.amazon.com/s/ref=nb_sb_noss?url=search-alias%3Dstripbooks&field-keywords=marvel ${eventList[z]}">${eventList[z]}</a></li>`);
// 				}
// 			}
// 		}
// 			$('.deleteChar').click(function(){
// 		let characterName = $(this).prev()[0].textContent;

// 		$.ajax({
// 			method: "DELETE",
// 			url: "/api/hoomans/char",
// 			data: JSON.stringify({username:localStorage.username,
// 				characterName: characterName}),
// 			dataType: "json",
// 			contentType: "application/json"
// 		})
// 		.then(function(response){
// 			console.log(response);
// 		})
// 		.then(()=>{
// 			location.href='mainPage.html';

// 			})
// 	});
// 		})
// 	}	
// }
// }