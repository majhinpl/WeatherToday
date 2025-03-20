document.addEventListener("DOMContentLoaded", () => {
  // grab the elements
  const queryInput = document.getElementById("weather-input");
  const queryArea = document.getElementById("get-weather");
  const recentLocation = document.querySelector(".location");
  const errorMsg = document.getElementById("error-message");

  const API_KEY = "7ef8f48cd500c8185b2e1cb9b9f9c9ff";

  queryArea.addEventListener("click", async () => {
    const searchArea = queryInput.value.trim();
    if (!searchArea) return;

    // web request
    try {
      const weatherdata = await fetchWeatherdata(searchArea);
      displayWeatherInfo(weatherdata);
      errorMsg.classList.add("hidden");
    } catch (error) {
      showError();
    }
  });

  async function fetchWeatherdata(city) {
    // gets weather data
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${API_KEY}`;

    const response = await fetch(url);

    if (!response.ok) {
      throw new Error("City not found");
    }

    console.log(response);

    const data = await response.json();
    return data;
  }

  saveLocations();

  function displayWeatherInfo(data) {
    // display weather data
    recentLocation.innerHTML = `
    <span>${data.name}, ${data.sys.country}</span>
    <span>${data.main.temp}<sup>°</sup></span>
    <span>${data.weather[0].description}</span>
    `;
  }

  // show the error
  function showError() {
    errorMsg.classList.remove("hidden");
  }

  // save
  function saveLocations() {
    localStorage.setItem("city", JSON.stringify(city));
  }
});
