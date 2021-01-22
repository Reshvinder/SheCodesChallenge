function displaycurrenttemp (response) {
  console.log (response.data);

  document.querySelector ("#city-name").innerHTML = response.data.name;
  document.querySelector ("#current-temp").innerHTML = Math.round (response.data.main.temp);
  document.querySelector ("#lowest-temp").innerHTML = Math.round (response.data.main.temp_min);
  document.querySelector ("#highest-temp").innerHTML = Math.round (response.data.main.temp_max);
  document.querySelector ("#humidity").innerHTML = Math.round (response.data.main.humidity);
  document.querySelector ("#wind").innerHTML = Math.round (response.data.wind.speed);
  document.querySelector ("#description").innerHTML = response.data.weather[0].description;
  document.querySelector ("#icon").setAttribute("src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
}



function searchCity (city) {
let apiKey = "fe0d4526b64ca05843436bd7ebaf7c7a";
let units= "metric";
let apiURL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${units}`;
axios.get(apiURL).then(displaycurrenttemp)
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
  let temperatureElement = document.querySelector("#currentTemp");
  temperatureElement.innerHTML = 66;
}

function convertToCelsius(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#currentTemp");
  temperatureElement.innerHTML = 15;
}
  
function displaycurrentdate (date) {
  let days = ["Sun", "Mon", "Tues", "Wed", "Thur", "Fri", "Sat", "Sun"];
let months = ["January",
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
    "December"
  ];

  let currentYear = now.getFullYear();
  let currentDay = days[now.getDay()];
  let currentMonth = months[now.getMonth()];
  let currentDate = now.getDate();
  let currentHour = now.getHours ();
  if (currentHour <10) {
    currentHour = `0${currentHour}`;
  }
  let currentMin = now.getMinutes ();
  if (currentMin <10) {
    currentMin = `0${currentMin}`;
  }

  return `${currentDay} ${currentDate} ${currentMonth} ${currentYear}, ${currentHour}:${currentMin}`;

}

let currentDateTime = document.querySelector ("#current-date-time");
let now = new Date ();
currentDateTime.innerHTML = displaycurrentdate (now);

let currentLocationButton= document.querySelector ("#current-location-button");
currentLocationButton.addEventListener ("click", getCurrentLocation);


let searchForm= document.querySelector ("#search-form");
searchForm.addEventListener ("submit", handleSubmit);

let fahrenheitLink = document.querySelector("#fahrenheit-link");
fahrenheitLink.addEventListener("click", convertToFahrenheit);

let celsiusLink = document.querySelector("#celsius-link");
celsiusLink.addEventListener("click", convertToCelsius);

searchCity("New York");
