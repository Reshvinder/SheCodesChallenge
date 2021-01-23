function formatDate(timestamp) {
  let date = new Date(timestamp);

  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday"
  ];
  let day = days[date.getDay()];
  return `${day} ${formatHours(timestamp)}`;
}

function formatHours(timestamp) {
  let date = new Date(timestamp);
  let hours = date.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let minutes = date.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }

  return `${hours}:${minutes}`;
}


function displaycurrenttemp (response) {
  console.log (response.data);

let temperatureElement = document.querySelector("#current-temp");
celsiusTemperature = response.data.main.temp;
temperatureElement.innerHTML = Math.round(celsiusTemperature);

document.querySelector ("#current-temp").innerHTML = Math.round (response.data.main.temp);

  document.querySelector ("#city-name").innerHTML = response.data.name;
  document.querySelector ("#lowest-temp").innerHTML = Math.round (response.data.main.temp_min);
  document.querySelector ("#highest-temp").innerHTML = Math.round (response.data.main.temp_max);
  document.querySelector ("#humidity").innerHTML = Math.round (response.data.main.humidity);
  document.querySelector ("#wind").innerHTML = Math.round (response.data.wind.speed);
  document.querySelector ("#description").innerHTML = response.data.weather[0].description;
  document.querySelector ("#current-date-time").innerHTML= formatDate(response.data.dt * 1000);
  document.querySelector ("#icon").setAttribute("src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
}

function displayForecast(response) {
  let forecastElement = document.querySelector("#forecast");
  forecastElement.innerHTML = null;
  let forecast = null;

  for (let index = 0; index < 6; index++) {
    forecast = response.data.list[index];
    forecastElement.innerHTML += `
    <div class="card-group">
                    <img
        src="http://openweathermap.org/img/wn/${
          forecast.weather[0].icon
        }@2x.png"
      />
                    <div class="card-body">
                        <h5 class="card-title"> ${formatHours(forecast.dt * 1000)} </h5>
                        <p class="card-text"><strong>
          ${Math.round(forecast.main.temp_max)}°
        </strong>
        ${Math.round(forecast.main.temp_min)}°</p>
                    </div>
                    </div>
                    
  `;
  }
}

function searchCity (city) {
let apiKey = "fe0d4526b64ca05843436bd7ebaf7c7a";
let units= "metric";
let apiURL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${units}`;
axios.get(apiURL).then(displaycurrenttemp);

apiUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=metric`;
axios.get(apiUrl).then(displayForecast);
}

function handleSubmit(event) {
  event.preventDefault();
let city = document.querySelector ("#floatingInput").value;
searchCity (city);
}

function searchLocation(position) {
  let apiKey = "fe0d4526b64ca05843436bd7ebaf7c7a";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${
    position.coords.latitude
  }&lon=${position.coords.longitude}&appid=${apiKey}&units=metric`;

  axios.get(apiUrl).then(displaycurrenttemp);
}

function getCurrentLocation (event){
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(searchLocation);
}

function convertToFahrenheit(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#current-temp");

  celsiusLink.classList.remove("active");
  fahrenheitLink.classList.add("active");
  let fahrenheitTemperature = (celsiusTemperature * 9) / 5 + 32;
  temperatureElement.innerHTML = Math.round(fahrenheitTemperature);
}

function convertToCelsius(event) {
  event.preventDefault();
  celsiusLink.classList.add("active");
  fahrenheitLink.classList.remove("active");
  let temperatureElement = document.querySelector("#current-temp");
   temperatureElement.innerHTML = Math.round(celsiusTemperature);
}
  

let currentLocationButton= document.querySelector ("#current-location-button");
currentLocationButton.addEventListener ("click", getCurrentLocation);

let celsiusTemperature = null;

let searchForm= document.querySelector ("#search-form");
searchForm.addEventListener ("submit", handleSubmit);

let fahrenheitLink = document.querySelector("#fahrenheit-link");
fahrenheitLink.addEventListener("click", convertToFahrenheit);

let celsiusLink = document.querySelector("#celsius-link");
celsiusLink.addEventListener("click", convertToCelsius);

searchCity("New York");


