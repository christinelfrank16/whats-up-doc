
import $ from 'jquery';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.min.js';
import './styles.css';
import {CallDoc} from './js/requestDocInfo.js';
import { displayDoctor } from './views/doctorView';

$(document).ready(function(){
  $('#docSearch').submit(function(event){
    event.preventDefault();
    const searchTerm = $('#searchInput').val();
    const searchType = $('input:radio[name=searchType]:checked').val();
    let callDoc = new CallDoc();
    let results;

    if(searchTerm === ""){
      results = callDoc.listResults('doctors');
    } else if(searchType === 'doctors'){
      results = callDoc.listResults('doctors', searchTerm);
    } else if (searchType === 'symptom'){
      results = callDoc.listResults('doctors', "", searchTerm);
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
          displayHtml += `Sorry, no results available for your search.`
        }
      }
      $('#results').html(displayHtml);
    });
    results.catch(function(error){
      console.log("Error found:", error);
      $('#results').html(`<div class="errorMsg">There was an error in your request. Please try a different search.</div>`);
    });

  });
});
