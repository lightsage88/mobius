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
  		minChars: 5,
  		contentType: 'application/json',
  		dataType: 'json',
  		paramName: 'nameStartsWith',
  		transformResult: function(response) {
  			resultArray = response.data.results;
  			console.log(resultArray);
  			lookupLimit: 5
  			// for(let i=0; i<resultArray.length; i++) {
  			// 	characterNames.push({value: `${resultArray[i].name}`, data: 'any'});
  			// }
  			// console.log(characterNames);
  			return {
  				suggestions: $.map(response.data.results, function(results) {
  					return { value: results.name, data: 'any'};
  				}),
  				lookupLimit: 5
  			};
  		},
  		lookupLimit: 5,
  		zIndex: 9999

   });