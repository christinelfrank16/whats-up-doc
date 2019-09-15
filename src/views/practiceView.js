export function displayPractice(practiceArray){
  const name = practiceArray.name;
  let html = ``;
  if(name){
    html = `
      <div class="card" id="${practiceArray.uid}">
        <div class="card-body">
          <h5 class="card-title">${name}</h5>
          ${buildPracticeAddress(practiceArray.visit_address, practiceArray.phones)}<br>
          <p class="new-patients">Is ${practiceArray.accepts_new_patients ? "" : "<strong>not</strong> "} accepting new patients</p>          ${buildDocList(practiceArray.doctors)}
          <button class="less" type="button">Show Less</button>
        </div>
        <div class="dots">
          <p>...</p>
        </div>
        <div class="show-btns">
          <button class="more" type="button">Show More</button>
        </div>
      </div>
    `;
  }
    return html;
}

function buildPracticeAddress(vititAddressNode, phonesNode){
  let results = '';
  if(vititAddressNode){
    results += `<p class="address">
                ${vititAddressNode.street}<br>
                ${vititAddressNode.city}, ${vititAddressNode.state} ${vititAddressNode.zip}
                ${buildPhonesList(phonesNode)}
                </p>
                `;
  }
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

function buildDocList(doctorsNode){
  let results = '<ul class="doctors"><strong>Doctors</strong>';
  if(doctorsNode){
    doctorsNode.forEach(function(doctor){
      const name = `${doctor.profile.first_name} ${doctor.profile.last_name}, ${doctor.profile.title}`;
      results += `<li><u>${name}</u><br><em>Specialties</em>:<div class="specials">`;
      doctor.specialties.forEach(function(speciality){
        results += `${speciality.name}<br>`;
      });
      results += `</div></li>`;
    });
    results += '</ul>';
  }
  return results;
}
