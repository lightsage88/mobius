
  let growingArray = [];
  let resultArray = [];
  let queryString = '';
  let characterNames;
    $('div.autocomplete-suggestions').removeAttr('style');

  $('.biginput').keydown(function(){

  	characterNames = [];
  		  		if(event.key !== 'Backspace' && 'Alt') {
  			growingArray.push(event.key);
  		} else {
  			growingArray.pop();
  		}
  		console.log(growingArray);
  		let growingString = growingArray.toString();
 		queryString = growingString.replace(/,/g,'');
  		console.log(growingString);
  		console.log(queryString);
  });
console.log(queryString);
  //on keydown an array is declared and filled and continuously fed into the line below so that each new additional character instatnly enters the autocomplete ajax request so that we get the whole autocomplete thing going on

  $('#autocomplete').autocomplete({
  		method: "GET",
  		serviceUrl: `https://gateway.marvel.com/v1/public/characters?ts=1&hash=f3700db80c0cf9a4891307451bb101b8&apikey=d049098ccf60dd7f74887d62466e540b&orderBy=name`,
  		minChars: 2,
  		maxHeight: 150,
  		contentType: 'application/json',
  		dataType: 'json',
  		paramName: 'nameStartsWith',
  		transformResult: function(response) {
  			resultArray = response.data.results;
  			console.log(resultArray);
  			return {
  				suggestions: $.map(response.data.results, function(results) {
  					return { value: results.name, data: {
  						id: results.id,
  						events: results.events,
  						thumbnail: results.thumbnail,
              name: results.name
  					}};
  				})
  			};
  		},
  		onSelect: function(suggestion) {
  			query = '';
  			console.log(suggestion);
  			console.log(suggestion.data);
        let entry = suggestion.data;
        $.ajax({
          url: '/api/hoomans/char',
          method: "PUT",
          data: JSON.stringify({marvelousData:entry, username: localStorage.username}),
          dataType: 'json',
          contentType: 'application/json',
         })
        .then((response)=>{
          console.log(response);
          console.log('yay');
        })
  			console.log(suggestion.data.thumbnail.path + '.' + suggestion.data.thumbnail.extension);
  			let thumbnail = `${suggestion.data.thumbnail.path}` + '.' + `${suggestion.data.thumbnail.extension}`;
        let eventBlock = suggestion.data.events.items;
          console.log(eventBlock);
        let eventList = [];
          for(let i=0; i<=eventBlock.length-1; i++) {
            eventList.push(eventBlock[i].name);
          }
          
  			$('#outputbox').append(`<div class='characterBox'>
          <img class='characterThumbnail' src=${thumbnail}>
  				<span class='characterName'>${suggestion.value}<span>
          <button class='deleteChar' type='button'>
          <img class='xSymbol' src='assets/images/xSymbol.png'>
          </button>
          <ul class='eventList'></ul>
          </div><!--characterBox-->`);
        eventList.forEach((name)=>{
            $('ul.eventList').append(`<li>${name}</li>`);
            console.log('clamburger');
          });
        $('.deleteChar').click(function(){
        console.log('deselecting a character');
        let characterName = `${suggestion.value}`;
        console.log(characterName);
        $.ajax({
          method: "DELETE",
          url: "/api/hoomans",
          data: JSON.stringify({username:localStorage.username, characterName: characterName}),
          dataType: "json",
          contentType: "application/json"
        })
        .then(function(response){
          console.log('star wars sucks now');
          console.log(response);
        })
       
  });
      window.location.reload();
  		}
   });

  