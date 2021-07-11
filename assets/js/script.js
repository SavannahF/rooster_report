// I search for a city
  // presented with 
      //current conditions
        //1. I am presented with:
          //Header
           //city name, 
           //the date, 
           //an icon representation of weather conditions
           
          //content
            //the temperature, 
            //the humidity, 
            //the wind speed, 
            // UV index
              // color that indicates whether the conditions are favorable, moderate, or severe

      //2. future conditions  (Five day)
        //I-day forecast that displays :
          //the date, 
          //an icon representation of weather conditions, 
          //the temperature
          ///the humidity

      //3. city is added to the search history
            //I am again presented with current and future conditions for that city


// OpenWeather API Key
const apiKey = "dc89074368694b069eea3603c3532618";

// Targeting Elements
var cityFormEl = document.querySelector("#city-form");
var citySearchNameEl = document.querySelector("#city-name");

var searchEl = document.querySelector("#search");
var historyButtonsEl = document.querySelector("#history-buttons");
var historyCardEl = document.querySelector("#history");
var trashEl = document.querySelector("#trash");

var currentWeatherCardEl = document.querySelector("#current-weather-card");
var weatherStatusEl = document.querySelector("#weather-status");
var currentWeatherEl = document.querySelector("#current-weather");

var iconImageEl = document.getElementById('icon-span')



var forecast5dayCardEl = document.querySelector("#forecast-card");
var forecast5dayEl = document.querySelector("#forecast-body")

var today = new Date();
var searchHistoryArray = [];


var formSubmitHandler = function (e) {
    e.preventDefault();
    var city = citySearchNameEl.value.trim();
    if (city) {
        // Set city name in local storage and generate history buttons
        searchHistoryArray.push(city);
        // "weatherHistory was called weatherSearch"
        localStorage.setItem("weatherHistory", JSON.stringify(searchHistoryArray));
        var searchHistoryEl = document.createElement("button");
        searchHistoryEl.className = "btn";
        searchHistoryEl.setAttribute("data-city", city);
        searchHistoryEl.innerHTML = city;
        historyButtonsEl.appendChild(searchHistoryEl);
        // makes visible
        historyCardEl.removeAttribute("style");
        getCurrentCityWeather(city);
        citySearchNameEl.value = "";
    } else {
        alert("Please type a City Name into the Search field...");
    }
};

// Call data from Openweather
// getWeatherInfo
function getCurrentCityWeather (city) {
    var apiWeatherURL = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=" + apiKey;

    fetch(apiWeatherURL)
      .then(function (cityResponse) {
        return cityResponse.json();
      })
      .then(function (cityResponse) {
          console.log(cityResponse);
          const { base, clouds, coord, dt,id, main, name, sys, timezone, visibility, weather, wind } = cityResponse
          const { speed, gust } = wind
          const date = new Date(dt *1000)
          const readableDate = date.toDateString();
          const icon = weather[0].icon
          const iconURL = `http://openweathermap.org/img/wn/${icon}@2x.png`
         
       
          console.log('ICON--> ', icon)
         
          console.log('GUST-->', gust)
          //currentWeatherCardEl - container element
          //weatherStatusEl  - h2
          //currentWeatherEl - div

          //Header
          //city name, 
          //the date, 
          //an icon representation of weather conditions
          weatherStatusEl.innerHTML = `${name} ${readableDate} `
          iconImageEl.setAttribute('src', `${iconURL}`)
          
          //content
            //the temperature, 
            const tempEl = document.createElement('div')
            tempEl.innerHTML = `Temperature (K*): ${main.temp}`
            currentWeatherEl.appendChild(tempEl)
            //the humidity, 
            const humidityEl = document.createElement('div')
            humidityEl.innerHTML = `Humidity: ${main.humidity}%`
            currentWeatherEl.appendChild(humidityEl)

            //the wind speed, 
            const windSpeedEl = document.createElement('div')
            windSpeedEl.innerHTML = `Humidity: ${wind.speed} MPH`
            currentWeatherEl.appendChild(windSpeedEl)
            // UV index
            fetch()
              // color that indicates whether the conditions are favorable, moderate, or severe


    
  

      })
      .catch(function(error){ console.log(err) })
  }


// Check Local Storage for any Search History to Load
var loadHistory = function () {
    searchArray = JSON.parse(localStorage.getItem("weatherHistory"));
    if (searchArray) {
      searchHistoryArray = JSON.parse(localStorage.getItem("weatherHistory"));
      for (let i = 0; i < searchArray.length; i++) {
        var searchHistoryEl = document.createElement("button");
        searchHistoryEl.className = "btn";
        searchHistoryEl.setAttribute("data-city", searchArray[i]);
        searchHistoryEl.innerHTML = searchArray[i];
        historyButtonsEl.appendChild(searchHistoryEl);
        // makes visible
        historyCardEl.removeAttribute("style");
      }
    }
  };

// Use Search History to Search for City's Weather
var buttonClickHandler = function (event) {
    var city = event.target.getAttribute("data-city");
    if (city) {
    getCurrentCityWeather(city);
    }
  };

// Clear Search History
var clearHistory = function (event) {
    localStorage.removeItem("weatherHistory");
    // makes hidden again
    historyCardEl.setAttribute("style", "display: none");
  };


// Event Listener for Search
cityFormEl.addEventListener("submit", formSubmitHandler);
// Event Listener for History
historyButtonsEl.addEventListener("click", buttonClickHandler);
// Event Listener for Clearing History
trashEl.addEventListener("click", clearHistory);

