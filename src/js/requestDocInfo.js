export class CallDoc {
  constructor(){
    this.apiKey = process.env.exports.apiKey;
    this.baseUrl = 'https://api.betterdoctor.com/2016-03-01';
    this.location = '45.5051, 122.6750'; // lat, long
    this.range = '25'; //miles
    this.limit = 10;
    this.skipIndex = 0;
  }

  buildUrl(value){
    return url = `${this.baseUrl}/${value}?location=${this.location},${this.range}&skip=${this.skipIndex}&limit=${this.limit}&user_key=${this.apiKey}`;
  }
  
  listResults(searchType){
    return new Promise((resolve, reject) => {
      let request = new XMLHttpRequest();
      const url = this.buildUrl(searchType);

      request.onload = function(){
        if (this.status === 200) {
          resolve(request.response);
        } else {
          reject(Error(request.statusText));
        }
      }
      request.open("GET", url, true);
      request.send();
    });
  }
}
