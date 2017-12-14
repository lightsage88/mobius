  // $('#autocomplete').autocomplete({
  //   lookup: currencies,
  //   onSelect: function (suggestion) {
  //     var thehtml = '<strong>Currency Name:</strong> ' + suggestion.value + ' <br> <strong>Symbol:</strong> ' + suggestion.data;
  //     $('#outputcontent').html(thehtml);
  //   }
  // });
  //https://gateway.marvel.com:443/v1/public/characters
  //?nameStartsWith=spi&orderBy=name&ts=1&
  //hash=f3700db80c0cf9a4891307451bb101b8
  //&apikey=d049098ccf60dd7f74887d62466e540b

// var request = require("request");

// var options = { method: 'GET',
//   url: 'https://gateway.marvel.com:443/v1/public/characters',
//   qs: 
//    { orderBy: 'name',
//      ts: '1',
//      hash: 'f3700db80c0cf9a4891307451bb101b8',
//      apikey: 'd049098ccf60dd7f74887d62466e540b',
//      nameStartsWith: 'spi' },
//   headers: 
//    { 'postman-token': '09344404-5186-85cb-7d89-b555fb2fbcf4',
//      'cache-control': 'no-cache' } };

// request(options, function (error, response, body) {
//   if (error) throw new Error(error);

//   console.log(body);
// });
  let growingArray = [];
  let resultArray = [];
  let queryString = '';
  let characterNames;
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
  						thumbnail: results.thumbnail
  					}};
  				})
  			};
  		},
         // data: JSON.stringify({username: username, password: password, firstName: firstName, lastName: lastName}),

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
  			console.log(thumbnail);
  			$('#outputbox').append(`<img class='characterThumbnail' src=${thumbnail}>
  								<span class='characterName'>${suggestion.value}<span>`);

  			//clicking one will call
  		}
   });

  //an ever present listening function
  // $.ajax({
  //   method: 'GET',
  //   url: '/api/hoomans/char',
  //   data: JSON.stringify({username: localStorage.username}),
  //   dataType: 'json',
  //   contentType: 'application/json'
  // })
  // .then((response){
  //   console.log(response)
  // })