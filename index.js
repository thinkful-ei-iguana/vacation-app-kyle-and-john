/* eslint-disable no-undef */
'use strict';

// put your own value below!
const apiKey = 'IDsukmllTdLs0TJYkoPdJrzPzPNJAQUz7yhTmQ3k'; 
const searchURL = 'https://developer.nps.gov/api/v1/parks';


function formatQueryParams(params) {
  const queryItems = Object.keys(params)
    .map(key => `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`)
  return queryItems.join('&');
}

function generatHtml(responseJson){
  const data = responseJson.data;
  const html =data.map(function(record){
    const name = record.fullName;
    const descr = record.description;
    const siteUrl = record.url;
    return `<div class= list-items>
                <p>Full name:${name}</p>
                <p>Description:${descr}</p>
                <p>url:${siteUrl}</p>`
  });
  $('#js-results').html(html);
}
function getNationalParks(query, maxResults=10) {
  const params = {
    api_key: apiKey,
    stateCode:query,
    part: 'snippet',
    limit: maxResults
  };
  const queryString = formatQueryParams(params)
  const url = searchURL + '?' + queryString;

  fetch(url)
    .then(response => {
      if (response.ok) {
        return response.json();
      }
      throw new Error(response.statusText);
    })
    .then(responseJson => { 
      generatHtml(responseJson);
    })
    .catch(err => {
      $('#js-error-message').text(`Something went wrong: ${err.message}`);
    });
    console.log(responseJson);
    
}

function watchForm() {
  $('form').submit(event => {
    event.preventDefault();
    const searchTerm = $('#js-search-term').val();
    const maxResults = $('#js-max-results').val();
    getNationalParks(searchTerm, maxResults);
  });
}

$(watchForm);