export class CallDoc {
  constructor(){
    this.apiKey = process.env.exports.apiKey;
    this.baseUrl = 'https://api.betterdoctor.com/2016-03-01';
    this.location = '37.773,-122.413'; // lat, long '45.5051,122.6750'
    this.range = 25; //miles
    this.limit = 10;
    this.skipIndex = 0;
    this.gender = 'any';
  }

  buildUrl(value, nameSearch, query, gender){
    nameSearch !== "" ? nameSearch = `name=${nameSearch}&` : nameSearch;
    query !== "" ? query = `query=${query}&` : query;
    gender !== "" ? gender = `gender=${gender}&` : gender;

    return `${this.baseUrl}/${value}?${nameSearch}${query}${gender}location=${this.location},${this.range}&skip=${this.skipIndex}&limit=${this.limit}&user_key=${this.apiKey}`;
  }

//inputs: doctors, practices, specialties, conditions
  listResults(searchType, nameSearch = "", query = "", gender=""){
    return new Promise((resolve, reject) => {
      let request = new XMLHttpRequest();
      const url = this.buildUrl(searchType, nameSearch, query, gender);
      console.log("url", url);

      request.onload = function(){
        if (this.status === 200) {
          resolve(request.response);
        } else {
          console.log(request);
          reject(new Error(request.statusText));
        }
      }
      request.open("GET", url, true);
      request.send();
    });
  }
}
