const apiKey = "31076bff1501d994442202d18c38e1f4";

// Getting all the output elements
const weatherEl = document.querySelector(".weather-container");
const dateTodayEl = document.querySelector(".date-today");
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

  // Display all the data gotten from the weather API
  dateTodayEl.textContent = getCurrentDate();

  weatherConditionEl.textContent = data.weather[0].main;
  console.log(data.weather[0].main);
  backgroundWeatherImage(data.weather[0].main);

  weatherTemperatureEl.textContent =
    kelvinToFahrenheit(parseFloat(data.main.temp)) + "°F";

  weatherDescriptionEl.textContent = data.weather[0].description;

  temperatureFeelsLikeEl.textContent =
    "feels like " + kelvinToFahrenheit(parseFloat(data.main.feels_like)) + "°F";

  temperatureHumidityEl.textContent = "💧Humidity: " + data.main.humidity;

  temperaturePressureEl.textContent = "🌌Pressure: " + data.main.pressure;

  sunriseEl.textContent =
    "🌞Sunrise: " + formatTime(convertSecondsToDate(data.sys.sunrise));

  sunsetEl.textContent =
    "☀Sunset: " + formatTime(convertSecondsToDate(data.sys.sunset));
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

const getCurrentDate = function () {
  const date = new Date();
  return `${(date.getMonth() + 1).toString().padStart(2, "0")}-${date
    .getDate()
    .toString()
    .padStart(2, "0")}-${date.getFullYear()}`;
};

const backgroundWeatherImage = function (weather) {
  console.log(`what s the weather ${weather}`);

  if (weather.toLowerCase().includes("rain")) {
    weatherEl.classList.add("background-rainy");
    weatherEl.classList.add("weather-bottom-opacity");
  } else if (weather.toLowerCase().includes("cloud")) {
    weatherEl.classList.add("background-cloudy");
  } else if (weather.toLowerCase().includes("sun")) {
    weatherEl.classList.add("background-sunny");
  } else if (weather.toLowerCase().includes("clear")) {
    weatherEl.classList.add("background-clear");
  }
};
