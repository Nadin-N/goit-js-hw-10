import { fetchCountries } from './fetchCountries';
import './css/styles.css';
import debounce from 'lodash.debounce';
import Notiflix from 'notiflix';

const DEBOUNCE_DELAY = 300;
const MESSAGE_SHOW_TIME = {
  position: 'center-top',
  timeout: 1500,
  opacity: 0.8,
  width: '500px',
  fontSize: '24px',
};

const refs = {
  inputSearchCountryEl: document.querySelector('input#search-box'),
  countriesListEl: document.querySelector('.country-list'),
  countryInfoEl: document.querySelector('.country-info'),
};

refs.inputSearchCountryEl.addEventListener(
  'input',
  debounce(onCountryInput, DEBOUNCE_DELAY)
);

function onCountryInput(event) {
  const countryName = event.target.value.trim();

  if (countryName === '') {
    clearMarkup();
    return;
  }

  fetchCountries(countryName)
    .then(data => {
      renderCountryInfo(data);
    })
    .catch(error => {
      clearMarkup();

      Notiflix.Notify.failure(
        'Oops, there is no country with that name',
        MESSAGE_SHOW_TIME
      );
    });
}

function renderCountryInfo(countries) {
  if (countries.length >= 10) {
    clearMarkup();

    Notiflix.Notify.info(
      'Too many matches found. Please enter a more specific name.',
      MESSAGE_SHOW_TIME
    );
    return;
  } else if (countries.length > 1 && countries.length < 10) {
    createCountriesList(countries);
  } else {
    createCountryInfo(countries);
  }
}

function clearMarkup() {
  refs.countryInfoEl.innerHTML = '';
  refs.countriesListEl.innerHTML = '';
}

function createCountriesList(countries) {
  const markup = countries
    .map(
      ({
        flags: { svg: flagSvg },
        name: { official: countryOfficialName },
      }) => {
        return `
<li>
<img src = "${flagSvg}" alt = "flag of ${countryOfficialName}"
width ="50" height = "30">
<span>${countryOfficialName}</span></li>
	`;
      }
    )
    .join('');
  refs.countriesListEl.innerHTML = markup;
  refs.countryInfoEl.innerHTML = '';
}

function createCountryInfo(countries) {
  const markup = countries
    .map(
      ({
        flags: { svg: flagSvg },
        name: { official: countryOfficialName },
        capital,
        population,
        languages,
      }) => {
        return `
<p>
<img src = "${flagSvg}" alt = "flag of ${countryOfficialName}"
width ="50" height = "30">
<span>${countryOfficialName}</span></p>
<p><span>Capital: </span>${capital}</p>
<p> <span>Population: </span>${population}</p>
<p><span>Languages: </span>${Object.values(languages)}</p>
	`;
      }
    )
    .join('');
  refs.countryInfoEl.innerHTML = markup;
  refs.countriesListEl.innerHTML = '';
}
