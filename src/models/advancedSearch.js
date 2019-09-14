let zipcodes = require('zipcodes');

export function convertZipCode(zipcode){
  const zipLookup = zipcodes.lookup(zipcode);
  const latLong = `${zipLookup.latitude},${zipLookup.longitude}`;
  return latLong;
}
