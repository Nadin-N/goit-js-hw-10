'use strict';

const BASE_URL = 'https://restcountries.com/v3.1';
const fields = 'fields=name,capital,population,flags,languages';

function fetchCountries(countryName) {
  return fetch(`${BASE_URL}/name/${countryName}?${fields}`).then(response => {
    if (!response.ok) {
      throw new Error(response.status);
    }
    return response.json();
  });
}

export { fetchCountries };
