document.addEventListener('DOMContentLoaded' , () => {
    const cityInput = document.getElementById("city-input");
    const getWeatherBtn = document.getElementById("get-weather-btn");
    const weatherInfo = document.getElementById("weather-info");
    const cityNameDisplay = document.getElementById("city-name");
    const temperature = document.getElementById("temperature");
    const description = document.getElementById("description");
    const errorMessage = document.getElementById("error-message");

    const API_KEY = "b5096285a338d05872e2fffba8a545a0";

    getWeatherBtn.addEventListener('click', async () => {
        const city = cityInput.value.trim();
        if(!city) return;

        try {
            console.log("Fetching weather data....");
            const weatherData = await fetchWeatherData(city);
            displayWeatherData(weatherData);
        }
        catch(error){
            showError();
        }
    })

    async function fetchWeatherData(city){
        const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}`;
        const response = await fetch(url);

        if(!response.ok){
            throw new Error("City not found!");
        }

        const data = await response.json();
        return data;
    }

    function displayWeatherData(data){
        console.log(data);
        const {name, main, weather} = data;
        cityNameDisplay.textContent = name;

        weatherInfo.classList.remove('hidden');
        errorMessage.classList.add('hidden');
        temperature.textContent = `Temperature: ${main.temp}`;
        description.textContent = `Weather: ${weather[0].description}`;
    }

    function showError(){
        weatherInfo.classList.remove('hidden');
        errorMessage.classList.remove('hidden');
    }
})