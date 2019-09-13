export function displayDoctor(doctorInfoArray){
  const name = `${doctorInfoArray.profile.first_name} ${doctorInfoArray.profile.last_name}, ${doctorInfoArray.profile.title}`;

  let cardHtml = `
      <div class="card" id="${doctorInfoArray.uid}">
      <div class="row no-gutter">
        <div class="col-auto">
          <img src="${doctorInfoArray.profile.image_url}" alt="Doctor Profile Image, ${name}">
        </div>
        <div class="col">
          <div class="card-body">
            <h5 class="card-title">${name}</h5>
            <p class="card-text">${doctorInfoArray.profile.bio}</p>
            ${buildPracticeList(doctorInfoArray.practices)}
            ${buildSpecialitiesList(doctorInfoArray.specialties)}
          </div>
        </div>
      </div>
    </div>
  `;
  return cardHtml;
}

function buildPracticeList(practiceList){
  let results = '<ul><strong>Practices</strong>';
  practiceList.forEach(function(practice){
    results += `<li><a href="${practice.website}">${practice.name}</a></li>`;
  });

  results += '</ul>';
  return results;
}

function buildSpecialitiesList(specialtyList){
  let results = '<ul><strong>Specialties</strong>';
  specialtyList.forEach(function(specialty){
    results += `<li>${specialty.name}</li>`;
  });

  results += '</ul>';
  return results;
}
