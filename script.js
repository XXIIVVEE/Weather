import { getAll } from '@vercel/edge-config';
const { greeting } = await getAll(['Country']);    

const ApiKey = "03ba2368d7ee8c9f33ede6e957d0ded7"
const ApiUrl = `https://api.openweathermap.org/data/2.5/weather?units=metric&lang=ru&q=`;
const searchInput = document.querySelector(".search");
const searchButton = document.querySelector(".search-button button");


async function checkWeather(city) {
    const response = await fetch(ApiUrl + city + `&appid=${ApiKey}`);
  
    if (response.status === 404) {
      errorText.style.display = "block";
      weather.style.display = "none";
    } else {
      const data = await response.json();
      console.log(data);
  
      document.querySelector('.icon_conteiner-temp').innerHTML = Math.round(data.main.temp) + '&deg;'+ 'C';
        document.querySelector('.vlag').textContent = (data.main.humidity) + '%';
        document.querySelector('.vlag-label').textContent = 'Влажность';
        document.querySelector('.arf-temp').innerHTML = Math.round(data.main.feels_like) + '&deg;' + 'C';
        document.querySelector('.arf-temp-label').innerHTML = 'Ощущается как';
      document.querySelector('.weather-name').textContent = data.weather[0].description;
      document.querySelector('.iconweather').innerHTML = `<img src="https://openweathermap.org/img/wn/${data.weather[0]['icon']}@2x.png" width="80" height="85">`
        document.querySelector('.wind-speed').textContent = data.wind.speed + 'км/ч';
        document.querySelector('.wind-speed-label').textContent = 'Скорость ветра';
      document.querySelector('.counrty').textContent = data.name;
  
      // if (data.weather[0].main == "Clear") {
      //   weatherIcon.className = "fa-solid fa-sun";
      // } else if (data.weather[0].main == "Rain") {
      //   weatherIcon.className = "fa-solid fa-cloud-rain";
      // } else if (data.weather[0].main == "Mist") {
      //   weatherIcon.className = "fa-solid fa-cloud-mist";
      // } else if (data.weather[0].main == "Drizzle") {
      //   weatherIcon.className = "fa-solid fa-cloud-drizzle";
      // }
  
      weather.style.display = "block";
      errorText.style.display = "none";
    }
  }
  
  searchInput.addEventListener("keydown", (event) => {
    if (event.keyCode === 13) {
      checkWeather(searchInput.value);
      searchInput.value = "";
    }
  });
  searchButton.addEventListener("click", (event) => {
    checkWeather(searchInput.value);
    searchInput.value = "";
  })