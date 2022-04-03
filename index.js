// Date & Time Format
function formatDate(date) {
  let hours = date.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let minutes = date.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }

  let dayIndex = date.getDay();
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = days[dayIndex];

  return `${day}, ${hours}:${minutes}`;
}

let dateElement = document.querySelector("#date-time");
let currentTime = new Date();
dateElement.innerHTML = formatDate(currentTime);

//Changing City

function displayWeatherCondition(response) {
  console.log(response.data);
  document.querySelector("#city").innerHTML = response.data.name;
  document.querySelector("#temperature").innerHTML = Math.round(
    response.data.main.temp
  );

  document.querySelector("#humidity").innerHTML = response.data.main.humidity;

  document.querySelector("#wind").innerHTML = Math.round(
    response.data.wind.speed
  );
  document.querySelector("#description").innerHTML =
    response.data.weather[0].description;
}

// Searching for City + having Sydney as default

function searchCity(city) {
  let apiKey = "873731ae1b864ce46c8dddd12bbd37bd";
  let units = "metric";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

  axios.get(apiUrl).then(displayWeatherCondition);
}

function handleSubmit(event) {
  event.preventDefault();
  let city = document.querySelector("#city-input").value;
  searchCity(city);
}

function searchLocation(position) {
  let apiKey = "873731ae1b864ce46c8dddd12bbd37bd";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=${apiKey}&units=metric`;

  axios.get(apiUrl).then(displayWeatherCondition);
}

// Current location - Geolocation

function getCurrentLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(searchLocation);
}

// Temperature
function convertToCelcius() {
  let celciusTemp = document.querySelector("#temperature");
  celciusTemp.innerHTML = "19°";
}

let newCelciusTemp = document.querySelector("#celcius");
newCelciusTemp.addEventListener("click", convertToCelcius);

function convertToFahrenheit() {
  let fahrenheitTemp = document.querySelector("#temperature");
  fahrenheitTemp.innerHTML = "66°";
}

let searchForm = document.querySelector("#city-form");
searchForm.addEventListener("submit", handleSubmit);

let newFahrenheitTemp = document.querySelector("#fahrenheit");
newFahrenheitTemp.addEventListener("click", convertToFahrenheit);

let currentLocationButton = document.querySelector("#geolocation");
currentLocationButton.addEventListener("click", getCurrentLocation);

searchCity("Sydney");
