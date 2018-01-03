
	if((localStorage.getItem('token') === null || undefined) && (location.href === 'http://localhost:8080/mainPage.html' || 'https://shrouded-anchorage-29615.herokuapp.com/mainPage.html' ||'http://localhost:8080/accountPage.html' || 'https://shrouded-anchorage-29615.herokuapp.com/accountPage.html')) {
		console.log('crips');
		window.location = 'index.html';
	} else {
		
	}
