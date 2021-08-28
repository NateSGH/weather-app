import './style.css';
import { fromUnixTime, format } from 'date-fns';

const API_KEY = '';

const cityInput = document.getElementById('city');
const submitBtn = document.getElementById('submit');
const unitSlider = document.getElementById('unit-slider');

let units = 'metric';
let currentWeatherCity = '';

document.querySelector('body').style.background = "url('/src/images/background.jpg')";

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

  const weatherInfoWrapper = document.createElement('div');
  weatherInfoWrapper.classList.add('weather-info-div');

  const cityName = document.createElement('p');
  cityName.innerText = `${weatherObj.name}, ${weatherObj.sys.country}`;

  const currentDate = document.createElement('p');
  currentDate.innerText = format(fromUnixTime(weatherObj.dt), 'iiii, do LLL yyyy kk:mm');

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

  const windSpeed = document.createElement('p');
  windSpeed.innerText = `Wind: ${weatherObj.wind.speed} ${
    units === 'metric' ? 'm/s' : 'miles/hour'
  }`;

  // Photo by Lum3n from Pexels

  const sunriseTime = document.createElement('p');
  sunriseTime.innerText = `Sunrise: ${format(fromUnixTime(weatherObj.sys.sunrise), 'kk:mm')}`;

  const sunsetTime = document.createElement('p');
  sunsetTime.innerText = `Sunset: ${format(fromUnixTime(weatherObj.sys.sunset), 'kk:mm')}`;

  weatherIconWrapper.appendChild(weatherIcon);

  weatherInfoWrapper.appendChild(cityName);
  weatherInfoWrapper.appendChild(currentDate);
  weatherInfoWrapper.appendChild(temperature);
  weatherInfoWrapper.appendChild(feelsTemp);
  weatherInfoWrapper.appendChild(weather);
  weatherInfoWrapper.appendChild(windSpeed);
  weatherInfoWrapper.appendChild(sunriseTime);
  weatherInfoWrapper.appendChild(sunsetTime);

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
