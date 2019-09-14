
import $ from 'jquery';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.min.js';
import './styles.css';
import {CallDoc} from './js/requestDocInfo.js';
import { displayDoctor } from './views/doctorView';
import { convertZipCode } from './models/advancedSearch.js';

$(document).ready(function(){
  let callDoc = new CallDoc();
  $('#docSearch').submit(function(event){
    event.preventDefault();
    const searchTerm = $('#searchInput').val();
    const searchType = $('input:radio[name=searchType]:checked').val();
    let results;

    // direct search for doctor
    if(searchType === 'doctors' && searchTerm === ''){
      results = callDoc.listResults(searchType);
    } else if(searchType === 'doctors'){
      results = callDoc.listResults(searchType, searchTerm);
    } else if (searchType === 'symptom'){
      results = callDoc.listResults('doctors', "", searchTerm);
    } else if (searchType === 'practices'){
      callDoc.limit = 1;
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
      } else if (result.meta.item_type === "Practice"){
        let promises = result.data.map(function(practice){
          return callDoc.listDoctorByPracticeResults(practice.uid);
        });
        return Promise.all(promises);
      }
      $('#results').html(displayHtml);
    })
    .then((responseList) => {
      if(responseList){
        let displayHtml = '';
        console.log("Made request2", responseList);
        responseList.forEach((response) => {
          let practiceDocResp = JSON.parse(response);
          const result = practiceDocResp;
          console.log("Made request", result);
          result.data.forEach(function(doctorInfo){
            displayHtml += displayDoctor(doctorInfo);
          });
        });
      }
    });
    results.catch(function(error){
      console.log("Error found:", error);
      $('#results').html(`<div class="errorMsg">The following error was received from your request: " ${error}". Please try a different search.</div>`);
    });
  });

  $('#showMore-label').click(function(){
    if($('#showMore').prop('checked') === true){
      $('#moreOptions').slideDown();
    } else {
      $('#moreOptions').slideUp();
    }
  });

  $('#locationOptions').submit(function(event){
    event.preventDefault();
    checkAdvSearchInput(callDoc)
  });

  $('#range4-label').click(function(event){
    if(event.target.id.includes("custom")){
      $('#range4').prop("checked", true);
    } else {
      $('#customRange').select();
    }
  });

  $('#results').on('click', '.more', function(){
    const card = $(this).closest(".card");
    console.log("click", card);
    card.find('.card-body').addClass('fullSize');
    card.find('.dots').hide();
    card.find('.less').show();
    $(this).hide();
  });

    $('#results').on('click', '.less', function(){
    const card = $(this).closest(".card");
    card.find('.card-body').removeClass('fullSize');
    card.find('.dots').show();
    card.find('.more').show();
    $(this).hide();
  });
});

function checkAdvSearchInput(callDoc){
  const range = $('input:radio[name=range]:checked').val();
  const customRange = $('#customRange').val();
  const zipcode = $('#zipcode').val();
  const zipRegex = new RegExp('^[0-9]{5}$');

  if(range === "other" && (customRange && !isNaN(customRange))){
    callDoc.range = customRange;
  }

  if(zipcode && zipRegex.test(zipcode)){
    callDoc.location = convertZipCode(zipcode);
  }
}
