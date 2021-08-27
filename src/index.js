import './style.css';

const cityInput = document.getElementById('city');
const submitBtn = document.getElementById('submit');

async function getWeatherByCityName(city) {
  const response = await fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=[]]&units=metric`,
    { mode: 'cors' }
  );
  const weatherData = await response.json();

  console.log(weatherData);

  printWeatherData(weatherData);
}

function printWeatherData(weatherObj) {
  const container = document.querySelector('.weather-container');

  const cityName = document.createElement('p');
  cityName.innerText = weatherObj.name;

  const temperature = document.createElement('p');
  temperature.innerText = weatherObj.main.temp;

  const weather = document.createElement('p');
  weather.innerText = weatherObj.weather[0].main;

  container.appendChild(cityName);
  container.appendChild(temperature);
  container.appendChild(weather);
}

submitBtn.addEventListener('click', () => {
  if (cityInput.value !== '') {
    getWeatherByCityName(cityInput.value);
  }
});

getWeatherByCityName('Kaliningrad');
