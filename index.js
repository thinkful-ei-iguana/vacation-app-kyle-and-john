/* eslint-disable no-undef */
'use strict';

// put your own value below!
const apiKey = 'IDsukmllTdLs0TJYkoPdJrzPzPNJAQUz7yhTmQ3k'; 
const searchURL = 'https://developer.nps.gov/api/v1/parks';


function formatQueryParams(params) {
  const queryItems = Object.keys(params)
    .map(key => `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`);
  return queryItems.join('&');
}


function displayResults(responseJson) {
  // if there are previous results, remove them
  console.log(responseJson);
  $('#results-list').empty();
  // iterate through the items array
  for (let i = 0; i < responseJson.data.length; i++){
    // for each video object in the items 
    //array, add a list item to the results 
    //list with the video title, description,
    //and thumbnail
    $('#results-list').append(
      `<li><h3>${responseJson.data[i].fullName}</h3>
      <p>${responseJson.data[i].description}</p>
      <a href="${responseJson.data[i].url}">link</a>
      </li>`
    )};
  //display the results section  
  $('#results').removeClass('hidden');
}


function getNationalParks(query, maxResults=10) {
  const params = {
    api_key: apiKey,
    //q: query,
    stateCode: query,
    //part: 'snippet',
    limit: maxResults,
  };
  const queryString = formatQueryParams(params);
  const url = searchURL + '?' + queryString;

  console.log(url);

  fetch(url)
    .then(response => {
      if (response.ok) {
        return response.json();
      }
      throw new Error(response.statusText);
    })
    .then(responseJson => displayResults(responseJson))
    .catch(err => {
      $('#js-error-message').text(`Something went wrong: ${err.message}`);
    });
    console.log(responseJson);
    
}

function watchForm() {
  $('form').submit(event => {
    event.preventDefault();
    let searchTerm = $('#js-search-term').val();
    let maxResults = $('#js-max-results').val();
   
    //let maxResults = document.getElementsById('#js-max-results').value;
    //let maxResults = $('#js-max-results').val();
    //let maxResults = event.target.max-displayResults.value;
    //let maxResults = $('#js-max-results').val();
    console.log($('#js-max-results').val());
    getNationalParks(searchTerm, maxResults);
  });
}

$(watchForm);

