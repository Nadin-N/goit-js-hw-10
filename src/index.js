import { fetchCountries } from './fetchCountries';
import './css/styles.css';
import debounce from 'lodash.debounce';
import Notiflix from 'notiflix';

const DEBOUNCE_DELAY = 300;

const refs = {
  inputSearchCountryEl: document.querySelector('input#search-box'),
};

// console.log(refs.inputSearchCountryEl);
// fetchCountries('ukraine');

refs.inputSearchCountryEl.addEventListener(
  'input',
  debounce(onCountryInput, DEBOUNCE_DELAY)
);

function onCountryInput() {
  const countryName = refs.inputSearchCountryEl.value.trim();
  console.log(countryName);

  fetchCountries(countryName)
    .then(data => {
      console.log(data);
    })
    .catch(error => {
      console.log(error);
    });

  //   fetchCountries(countryName);
}

// function renderCountryInfo(countryName) {
// 	const markup = `
// <h2>Name</h2>
// <p>Capital</p>
// <p>Population</p>
// <p>Capital</p>
// 	`;
// }
