const apiKey = "31076bff1501d994442202d18c38e1f4";

// Getting all the output elements
const bodyEL = document.querySelector("body");
const weatherEl = document.querySelector(".weather-container");
const dateTodayEl = document.querySelector(".date-today");
const optionBtnEl = document.querySelector(".option-btn");
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
  backgroundWeatherImage(data.weather[0].main);

  weatherLocationEl.textContent = data.name;
  weatherTemperatureEl.textContent =
    kelvinToFahrenheit(parseFloat(data.main.temp)) + "°F";

  weatherDescriptionEl.textContent = data.weather[0].description;

  temperatureFeelsLikeEl.textContent =
    "feels like " + kelvinToFahrenheit(parseFloat(data.main.feels_like)) + "°F";

  temperatureHumidityEl.textContent = "💧Humidity: " + data.main.humidity;

  temperaturePressureEl.textContent = "🌌Pressure: " + data.main.pressure;

  sunriseEl.textContent =
    "🌞Sunrise: " +
    formatTime(
      convertSecondsToDate(data.sys.sunrise * 1000 - data.timezone * 1000)
    );

  sunsetEl.textContent =
    "☀Sunset: " +
    formatTime(
      convertSecondsToDate(data.sys.sunset * 1000 - data.timezone * 1000)
    );
};

const kelvinToFahrenheit = function (kelvin) {
  return Math.floor((kelvin - 273) * (9 / 5) + 32);
};

const convertSecondsToDate = function (seconds) {
  return new Date(seconds); // The api returned date is in seconds, need milli sectonds
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

  if (
    weather.toLowerCase().includes("rain") ||
    weather.toLowerCase().includes("drizzle")
  ) {
    bodyEL.classList.add("body-background-rainy");
    weatherEl.classList.add("background-rainy");
    weatherEl.classList.add("weather-bottom-opacity");
  } else if (weather.toLowerCase().includes("cloud")) {
    bodyEL.classList.add("body-background-cloudy");
    weatherEl.classList.add("background-cloudy");
  } else if (weather.toLowerCase().includes("sun")) {
    bodyEL.classList.add("body-background-sunny");
    weatherEl.classList.add("background-sunny");
  } else if (weather.toLowerCase().includes("clear")) {
    bodyEL.classList.add("body-background-clear");
    weatherEl.classList.add("background-clear");
  } else if (weather.toLowerCase().includes("snow")) {
    bodyEL.classList.add("body-background-snow");
    weatherEl.classList.add("background-snow");
  } else if (
    weather.toLowerCase().includes("haze") ||
    weather.toLowerCase().includes("fog")
  ) {
    bodyEL.classList.add("body-background-haze-foggy");
    weatherEl.classList.add("background-haze-foggy");
  }
};

optionBtnEl.addEventListener("click", function () {
  renderAdditionDialogBox();
});

const renderAdditionDialogBox = function () {
  addCityModal();
  userActions();
};

const addCityModal = function () {
  const html = `
  <div class="confirm_dialog-background">
      <div class="confirm_dialog-box">
        <div class="confirm_dialog-title">
          <span>Check Weather</span>
        </div>
        <div class="confirm_dialog-message">
          <label>Enter a city name to check the weather.</label>
          <input class="city-input" type="text">
        </div>
        <div class="confirm_dialog_btn-box">
          <button class="confirm_button--submit">Submit</button>
          <button class="confirm_button--cancel">Cancel</button>
        </div>
      </div>
    </div>
    `;
  document.querySelector("body").insertAdjacentHTML("beforeend", html);
};

const userActions = function () {
  document.querySelector("body").addEventListener("click", function (e) {
    if (
      e.target.classList.contains("confirm_dialog-background") ||
      e.target.classList.contains("confirm_button--cancel")
    ) {
      if (document.querySelector(".confirm_dialog-background"))
        document.querySelector(".confirm_dialog-background").remove();
    }
  });
  const userCityInputEl = document.querySelector(".city-input");
  userCityInputEl.focus();

  document
    .querySelector(".confirm_button--submit")
    .addEventListener("click", function () {
      renderNewCityWeather(userCityInputEl);
    });

  userCityInputEl.addEventListener("keypress", function (e) {
    if (e.key === "Enter") renderNewCityWeather(userCityInputEl);
  });
};

const renderNewCityWeather = function (userCityInputEl) {
  const userCityInput = userCityInputEl.value;
  if (userCityInput != "") {
    const weatherAPIUrl = `https://api.openweathermap.org/data/2.5/weather?q=${userCityInput}&appid=${apiKey}`;
    clearBackgroundClass();
    renderWeatherDataHtml(weatherAPIUrl);
    document.querySelector(".confirm_dialog-background").remove();
  }
};

const clearBackgroundClass = function () {
  weatherEl.className = "weather-container";
  bodyEL.removeAttribute("class");
};
