import './style.css';
import { fromUnixTime, format } from 'date-fns';

const API_KEY = '';

const cityInput = document.getElementById('city');
const submitBtn = document.getElementById('submit');
const unitSlider = document.getElementById('unit-slider');

let units = 'metric';
let currentWeatherCity = '';

function capitilizeString(phrase) {
  return phrase.charAt(0).toUpperCase() + phrase.slice(1);
}

function printWeatherData(weatherObj) {
  const container = document.querySelector('.weather-container');
  container.innerHTML = '';

  const cityName = document.createElement('p');
  cityName.innerText = `${weatherObj.name}, ${weatherObj.sys.country}`;

  const currentDate = document.createElement('p');
  currentDate.innerText = format(fromUnixTime(weatherObj.dt), 'dd.MM.yyyy');

  const temperature = document.createElement('p');
  temperature.innerHTML = `${weatherObj.main.temp}<span>&#176;</span>${
    units === 'metric' ? 'C' : 'F'
  }`;

  const weather = document.createElement('p');
  weather.innerText = capitilizeString(weatherObj.weather[0].description);

  const feelsTemp = document.createElement('p');
  feelsTemp.innerHTML = `Feels Like: ${weatherObj.main.feels_like}<span>&#176;</span>${
    units === 'metric' ? 'C' : 'F'
  }`;

  container.appendChild(cityName);
  container.appendChild(currentDate);
  container.appendChild(temperature);
  container.appendChild(feelsTemp);
  container.appendChild(weather);
}

async function getWeatherByCityName(city) {
  const response = await fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=${units}`,
    { mode: 'cors' }
  );
  const weatherData = await response.json();

  console.log(weatherData);
  currentWeatherCity = city;

  printWeatherData(weatherData);
}

function toggleUnits() {
  if (units === 'metric') {
    units = 'imperial';
  } else {
    units = 'metric';
  }
  getWeatherByCityName(currentWeatherCity);
}

submitBtn.addEventListener('click', () => {
  if (cityInput.value !== '') {
    getWeatherByCityName(cityInput.value);
    cityInput.value = '';
  }
});

unitSlider.addEventListener('click', toggleUnits);

getWeatherByCityName('Kaliningrad');
