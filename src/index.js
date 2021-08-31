import './style.css';
import { fromUnixTime, format } from 'date-fns';

const API_KEY = '';

const cityInput = document.getElementById('city');
const submitBtn = document.getElementById('submit');
const unitSlider = document.getElementById('unit-slider');

let units = 'metric';
let currentWeatherCity = '';

// Photo by Lua Morales from Pexels
document.querySelector('html').style.background =
  "url('/src/images/background.jpg') no-repeat center center fixed";

document.querySelector('html').style.backgroundSize = 'cover';

function capitilizeString(phrase) {
  return phrase.charAt(0).toUpperCase() + phrase.slice(1);
}

function printWeatherData(weatherObj) {
  const container = document.querySelector('.weather-container');
  container.innerHTML = '';

  const weatherIconWrapper = document.createElement('div');
  weatherIconWrapper.classList.add('weather-icon-div');

  const weatherIcon = document.createElement('img');
  weatherIcon.src = `http://openweathermap.org/img/wn/${weatherObj.weather[0].icon}@4x.png`;

  const weather = document.createElement('p');
  weather.innerText = capitilizeString(weatherObj.weather[0].description);

  const weatherInfoWrapper = document.createElement('div');
  weatherInfoWrapper.classList.add('weather-info-div');

  const weatherMainInfo = document.createElement('div');
  weatherMainInfo.classList.add('weather-main-info');

  const cityName = document.createElement('p');
  cityName.innerText = `${weatherObj.name}, ${weatherObj.sys.country}`;
  cityName.classList.add('city-name');

  const currentDate = document.createElement('p');
  currentDate.innerText = format(fromUnixTime(weatherObj.dt), 'iiii, do LLL yyyy kk:mm');
  currentDate.classList.add('date');

  const temperature = document.createElement('p');
  temperature.innerHTML = `${weatherObj.main.temp}<span>&#176;</span>${
    units === 'metric' ? 'C' : 'F'
  }`;
  temperature.classList.add('temperature');

  const weatherSideInfo = document.createElement('div');
  weatherSideInfo.classList.add('weather-side-info');

  const feelsTemp = document.createElement('p');
  feelsTemp.innerHTML = `Feels Like: ${weatherObj.main.feels_like}<span>&#176;</span>${
    units === 'metric' ? 'C' : 'F'
  }`;

  const windSpeed = document.createElement('p');
  windSpeed.innerText = `Wind: ${weatherObj.wind.speed} ${units === 'metric' ? 'm/s' : 'mi/h'}`;

  const sunriseTime = document.createElement('p');
  sunriseTime.innerText = `Sunrise: ${format(fromUnixTime(weatherObj.sys.sunrise), 'kk:mm')}`;

  const sunsetTime = document.createElement('p');
  sunsetTime.innerText = `Sunset: ${format(fromUnixTime(weatherObj.sys.sunset), 'kk:mm')}`;

  weatherIconWrapper.appendChild(weatherIcon);
  weatherIconWrapper.appendChild(weather);

  weatherMainInfo.appendChild(cityName);
  weatherMainInfo.appendChild(currentDate);
  weatherMainInfo.appendChild(temperature);

  weatherSideInfo.appendChild(feelsTemp);
  weatherSideInfo.appendChild(windSpeed);
  weatherSideInfo.appendChild(sunriseTime);
  weatherSideInfo.appendChild(sunsetTime);

  weatherInfoWrapper.appendChild(weatherMainInfo);
  weatherInfoWrapper.appendChild(weatherSideInfo);

  container.appendChild(weatherIconWrapper);
  container.appendChild(weatherInfoWrapper);
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
