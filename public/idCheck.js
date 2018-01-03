
	if((localStorage.getItem('token') === null || undefined) && (window.location || location.href === 'http://localhost:8080/mainPage.html' || 'https://shrouded-anchorage-29615.herokuapp.com/mainPage.html' ||'http://localhost:8080/accountPage.html' || 'https://shrouded-anchorage-29615.herokuapp.com/accountPage.html')) {
		console.log('crips');
		location.reload();
		window.location = 'index.html';
	} else {
		
	}
