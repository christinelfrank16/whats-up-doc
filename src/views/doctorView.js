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
            <button class="less" type="button">Show Less</button>
          </div>
          <div class="dots">
            <p>...</p>
          </div>
          <div class="show-btns">
            <button class="more" type="button">Show More</button>
          </div>
        </div>
      </div>
    </div>
  `;
  return cardHtml;
}

function buildPracticeList(practiceList){
  let results = '';
  if(practiceList){
    results = '<ul class="practiceList"><strong>Practices</strong>';
    practiceList.forEach(function(practice){
      results += `<li>
      <a href="${practice.website}">${practice.name}</a>
      <p class="address">
      ${practice.visit_address.street}<br>
      ${practice.visit_address.city}, ${practice.visit_address.state} ${practice.visit_address.zip}
      ${buildPhonesList(practice.phones)}
      </p>
      <p class="new-patients">Is ${practice.accepts_new_patients ? "" : "<strong>not</strong> "} accepting new patients</p>
      </li>`;
    });

    results += '</ul>';
  }
  return results;
}

function buildSpecialitiesList(specialtyList){
  let results = '<ul class="specialtyList"><strong>Specialties</strong>';
  specialtyList.forEach(function(specialty){
    results += `<li>${specialty.name}</li>`;
  });
  results += '</ul>';
  return results;
}

function buildPhonesList(phoneList){
  let results = '';
  phoneList.forEach(function(phone){
    const phoneNum = `(${phone.number.substring(0,3)}) ${phone.number.substring(3,6)}-${phone.number.substring(6)}`;
    const phoneType = phone.type[0].toUpperCase() + phone.type.substring(1);
    results += `<br>${phoneType}: ${phoneNum}`;
  });
  return results;
}
