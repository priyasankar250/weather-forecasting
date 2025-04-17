async function getWeather() {
    const city = document.getElementById('city').value;
    if (!city) {
        alert('Please enter a city name.');
        return;
    }

    const apiKey = 'dafe8b887ceb43d8e05dbc3a5e916fec'; // Replace with your OpenWeatherMap API key

    try {
        const weatherResponse = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`);
        const weatherData = await weatherResponse.json();

        if (weatherData.cod === 200) {
            const weatherInfo = `
                <h2>${weatherData.name}, ${weatherData.sys.country}</h2>
                <p>Temperature: ${((weatherData.main.temp - 273.15) * 9/5 + 32).toFixed(2)} °F</p>
                <p>Weather: ${weatherData.weather[0].description}</p>
            `;
            document.getElementById('weather').innerHTML = weatherInfo;
        } else {
            document.getElementById('weather').innerHTML = `<p>${weatherData.message}</p>`;
            return;
        }

        const forecastResponse = await fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}`);
        const forecastData = await forecastResponse.json();

        if (forecastData.cod === "200") {
            const forecastList = forecastData.list;
            let forecastHTML = `<div class="forecast-container">`;
            forecastList.forEach((item, index) => {
                if (index % 8 === 0) { // Every 24 hours
                    forecastHTML += `
                        <div class="forecast-card">
                            <p><strong>${new Date(item.dt_txt).toLocaleDateString()}</strong></p>
                            <p>Temp: ${((item.main.temp - 273.15) * 9/5 + 32).toFixed(2)} °F</p>
                            <p>${item.weather[0].description}</p>
                        </div>
                    `;
                }
            });
            forecastHTML += `</div>`;
            document.getElementById('forecast').innerHTML = forecastHTML;
        }

    } catch (error) {
        console.error('Error fetching weather data:', error);
        document.getElementById('weather').innerHTML = '<p>Error fetching weather data. Please try again later.</p>';
    }
}
