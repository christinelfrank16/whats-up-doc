
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
    const searchTerm = $('searchInput').val();
    const searchType = $('input:radio[name=searchType]:checked').val();
    //debugger
    let callDoc = new CallDoc();
    let results = callDoc.listResults(searchType);

    results.then(function(response){
      const body = JSON.parse(response);
      const result = body;
      console.log("Made request", result);
      let displayHtml = '';
      if(result.meta.item_type === "Doctor"){
        result.data.forEach(function(doctorInfo){
          console.log("Request type", doctorInfo);
          displayHtml += displayDoctor(doctorInfo);
        });
      }
      $('#results').html(displayHtml);
    });

  });
});
