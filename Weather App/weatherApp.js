const apiKey = "31076bff1501d994442202d18c38e1f4";

let url =
  "api.openweathermap.org/data/2.5/weather?q={city name}&appid={API key}";

let london =
  "https://api.openweathermap.org/data/2.5/weather?q=London&appid=31076bff1501d994442202d18c38e1f4";

// let apiTemp = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}`;

const currentLocation = { latitude: 0, longitude: 0 };

const locationAccessed = function (position) {
  console.log(position);

  currentLocation.latitude = position.coords.latitude;
  currentLocation.longitude = position.coords.longitude;

  let weatherUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${currentLocation.latitude}&lon=${currentLocation.longitude}&appid=${apiKey}`;

  renderWeatherDataHtml(weatherUrl);
};

const locationDenied = function () {
  alert("Could not get location");
};

if (navigator.geolocation) {
  navigator.geolocation.getCurrentPosition(locationAccessed, locationDenied);
}

// const currentWeather = fetch(weatherUrl);
// currentWeather.then((res) => res.json()).then((data) => console.log(data));

const fetchWeather = async function (weatherUrl) {
  try {
    const response = await fetch(weatherUrl);
    const data = await response.json();
    return data;
  } catch (err) {
    console.log(err.name);
  }
};

const renderWeatherDataHtml = async function (weatherUrl) {
  const data = await fetchWeather(weatherUrl);
  console.log(data);
  const weatherConditionEl = document.querySelector(".weather-condition");
  const weatherLocationEl = document.querySelector(".weather-location");
  const weatherTemperatureEl = document.querySelector(".weather-temperature");
  const weatherDescriptionEl = document.querySelector(".weather-description");

  const temperatureFeelsLikeEl = document.querySelector(
    ".weather-temperature-feels-like"
  );
  const temperatureHumidityEl = document.querySelector(
    ".weather-temperature-humidity"
  );
  const temperaturePressureEl = document.querySelector(
    ".weather-temperature-pressure"
  );
  const sunriseEl = document.querySelector(".weather-temperature-sunrise");
  const sunsetEl = document.querySelector(".weather-temperature-sunset");

  weatherConditionEl.textContent = data.weather[0].main;

  weatherLocationEl.textContent = data.name;

  weatherTemperatureEl.textContent =
    kelvinToFahrenheit(parseFloat(data.main.temp)) + " F";

  weatherDescriptionEl.textContent = data.weather[0].description;

  temperatureFeelsLikeEl.textContent = data.main.feels_like;

  temperatureHumidityEl.textContent = data.main.humidity;

  temperaturePressureEl.textContent = data.main.pressure;

  sunriseEl.textContent = formatTime(convertSecondsToDate(data.sys.sunrise));

  sunsetEl.textContent = formatTime(convertSecondsToDate(data.sys.sunset));
};

const kelvinToFahrenheit = function (kelvin) {
  return Math.floor((kelvin - 273) * (9 / 5) + 32);
};

const convertSecondsToDate = function (seconds) {
  return new Date(seconds * 1000); // The api returned date is in seconds, need milli sectonds
};

const formatTime = function (date) {
  const hr = date.getHours().toString().padStart(2, "0");
  const min = date.getMinutes().toString().padStart(2, "0");

  return hr + ":" + min;
};
