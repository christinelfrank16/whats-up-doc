
import $ from 'jquery';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.min.js';
import './styles.css';
import {CallDoc} from './js/requestDocInfo.js';
import { displayDoctor } from './views/doctorView';
import { convertZipCode } from './models/convertZipCode.js';

$(document).ready(function(){
  $('#docSearch').submit(function(event){
    event.preventDefault();
    const searchTerm = $('#searchInput').val();
    const searchType = $('input:radio[name=searchType]:checked').val();
    const zipcode = $('#zipcode').val();
    let callDoc = new CallDoc();
    if(zipcode){
      callDoc.location = convertZipCode(zipcode);
      console.log(zipcode, callDoc.location);
    }
    let results;

    // direct search for doctor
    if(searchType === 'doctors' && searchTerm === ''){
      results = callDoc.listResults(searchType);
    } else if(searchType === 'doctors'){
      results = callDoc.listResults(searchType, searchTerm);
    } else if (searchType === 'symptom'){
      results = callDoc.listResults('doctors', "", searchTerm);
    } else if (searchType === 'practices'){
      results = callDoc.listResults(searchType, searchTerm);
    }

    results.then(function(response){
      const body = JSON.parse(response);
      const result = body;
      console.log("Made request", result);
      let displayHtml = '';
      if(result.meta.item_type === "Doctor"){
        result.data.forEach(function(doctorInfo){
          displayHtml += displayDoctor(doctorInfo);
        });
        if(displayHtml === ""){
          displayHtml += `Sorry, no results are available for your search.`;
        }
      }
      $('#results').html(displayHtml);
    });
    results.catch(function(error){
      console.log("Error found:", error);
      $('#results').html(`<div class="errorMsg">The following error was received from your request: " ${error}". Please try a different search.</div>`);
    });

  });
});
