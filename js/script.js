// ===============================
// ||     DOM ELEMENTS         ||
// ===============================
// Selecting HTML elements to update dynamically
const searchBtn = document.querySelector(".header__search__btn");
const searchInput = document.querySelector(".header__search");
const cityName = document.querySelector(".main__h2");
const tempDetail = document.querySelector(".main__temp__detail");
const windDetail = document.querySelector(".main__wind__detail");
const weatherIcon = document.querySelector(".main__weather__icon");
const humidityDetail = document.querySelector(".main__humidity__detail");
const feelsLikeDetail = document.querySelector(".main__feel-like__detail");
const errorMessage = document.querySelector(".error-message");

// ===============================
// ||         API KEY          ||
// ===============================
// Replace with your own OpenWeather API key
const apiKey = "098a4ad0a4d6ab54ee47c0b0f45eb2cf";

// ===============================
// ||     FETCH WEATHER        ||
// ===============================
// Fetches weather data for the input city and updates the UI
function searchWeather() {
  const city = searchInput.value.trim();
  if (!city) return;

  cityName.textContent = "Loading...";
  errorMessage.textContent = "";

  fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`
  )
    .then((response) => {
      if (!response.ok) throw new Error("City not found");
      return response.json();
    })
    .then((data) => {
      // Update weather details
      cityName.textContent = data.name;
      tempDetail.innerHTML = `${Math.round(data.main.temp)}&deg;C`;
      windDetail.textContent = `${data.wind.speed} km/h`;
      humidityDetail.textContent = `${data.main.humidity}%`;
      feelsLikeDetail.innerHTML = `${Math.round(data.main.feels_like)}&deg;C`;

      // Set weather icon
      const iconCode = data.weather[0].icon;
      weatherIcon.src = `https://openweathermap.org/img/wn/${iconCode}@2x.png`;
      weatherIcon.alt = data.weather[0].description;

      // Clear search input
      searchInput.value = "";
    })
    .catch((err) => {
      cityName.textContent = "";
      errorMessage.textContent = "City not found";
    });
}

// ===============================
// ||     EVENT LISTENERS      ||
// ===============================
searchBtn.addEventListener("click", searchWeather);

searchInput.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    searchWeather();
  }
});

const year = document.getElementById("year");
const thisYear = new Date().getFullYear();
year.setAttribute("datetime", thisYear);
year.textContent = thisYear;
