async function getWeather() {
    const location = document.getElementById('location').value;
    const apiKey = 'ab066dc058244f29bbf63407240308';  // Your API Key

    const weatherInfo = document.getElementById('weather-info');

    if (location === '') {
        weatherInfo.innerHTML = 'Please enter a location.';
        return;
    }

    // Use HTTPS instead of HTTP for secure requests
    const url = `https://api.weatherapi.com/v1/current.json?q=${encodeURIComponent(location)}&key=${apiKey}`;

    try {
        console.log("Requesting weather data from URL:", url); // Debugging: Check URL
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();

        // Check the data structure in the console
        console.log("Weather data received:", data); // Debugging: Check data structure

        const temperature = data.current.temp_c;
        const description = data.current.condition.text;
        const city = data.location.name;
        const iconUrl = `https:${data.current.condition.icon}`;

        weatherInfo.innerHTML = `
            <h2>Weather in ${city}</h2>
            <img src="${iconUrl}" alt="${description}">
            <p>Temperature: ${temperature}°C</p>
            <p>Description: ${description}</p>
            <p>Wind Speed: ${data.current.wind_kph} km/h</p>
            <p>Humidity: ${data.current.humidity}%</p>
            <p>Pressure: ${data.current.pressure_mb} mb</p>
        `;
    } catch (error) {
        weatherInfo.innerHTML = 'Error fetching weather data: ' + error.message;
        console.error("Error fetching weather data:", error); // Debugging: Log errors
    }
}
