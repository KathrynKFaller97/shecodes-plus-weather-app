function formatDate(dateData) {
  todaysDate.innerHTML = `${day},<br>${month} ${date}, ${year}`;
}

function formatTime(timeData) {
  if (hour.toString().length === 1) {
    currentTime.innerHTML = `0${hour}:${minute}`;
  } else {
    if (minute.toString().length === 1) {
      currentTime.innerHTML = `${hour}:0${minute}`;
    } else {
      currentTime.innerHTML = `${hour}:${minute}`;
    }
  }
}

let now = new Date();

let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
let day = days[now.getDay()];

let months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];
let month = months[now.getMonth()];

let date = now.getDate();

let year = now.getFullYear();

let hour = now.getHours();

let minute = now.getMinutes();

let todaysDate = document.querySelector("#todays-date");

let currentTime = document.querySelector("#current-time");

formatDate();
formatTime();

function showTypedCityWeatherInformation(response) {
  document.querySelector("#current-city-name").innerHTML = response.data.name;
  document.querySelector("#temperature-weather-square").innerHTML = Math.round(
    response.data.main.temp
  );
  document.querySelector("#humidity").innerHTML = response.data.main.humidity;
  document.querySelector("#wind-speed").innerHTML = Math.round(
    response.data.wind.speed
  );
  document.querySelector("#weather-description").innerHTML =
    response.data.weather[0].main;
}

function searchCity(city) {
  let apiKey = "d60105920a1a24e9988b2bfb07e96334";
  let apiEndpoint = "https://api.openweathermap.org/data/2.5/weather?q=";
  let units = "metric";
  let apiUrl = `${apiEndpoint}${city}&appid=${apiKey}&units=${units}`;

  axios.get(apiUrl).then(showTypedCityWeatherInformation);
}

function handleSubmit(event) {
  event.preventDefault();
  let city = document.querySelector("#city-input").value;
  searchCity(city);
}

let searchCityForm = document.querySelector("#search-city-form");
searchCityForm.addEventListener("submit", handleSubmit);

searchCity("New York");

function showCurrentLocationCityAndTemperature(response) {
  document.querySelector("#current-city-name").innerHTML = response.data.name;
  document.querySelector("#temperature-weather-square").innerHTML = Math.round(
    response.data.main.temp
  );
  document.querySelector("#humidity").innerHTML = response.data.main.humidity;
  document.querySelector("#wind-speed").innerHTML = Math.round(
    response.data.wind.speed
  );
  document.querySelector("#weather-description").innerHTML =
    response.data.weather[0].main;
}

function showCurrentLocationPosition(position) {
  let apiKey = "d60105920a1a24e9988b2bfb07e96334";
  let units = "metric";
  let apiEndpoint = "https://api.openweathermap.org/data/2.5/weather?";
  let apiUrl = `${apiEndpoint}lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=${apiKey}&units=${units}`;

  axios.get(apiUrl).then(showCurrentLocationCityAndTemperature);
}

function getPosition(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(showCurrentLocationPosition);
}

let currentLocationButton = document.querySelector("#current-location-button");
currentLocationButton.addEventListener("click", getPosition);
