const apiKey = "54c1eb8e8a96a76cc3e3bc3696ac0e5c";
const apiURL = `https://api.openweathermap.org/data/2.5/weather?q=tooele&units=imperial&appid=${apiKey}`;

function calculateWindChill(tempF, windSpeed) {
  if (tempF <= 50 && windSpeed > 3) {
    return (
      35.74 +
      0.6215 * tempF -
      35.75 * Math.pow(windSpeed, 0.16) +
      0.4275 * tempF * Math.pow(windSpeed, 0.16)
    ).toFixed(1);
  } else {
    return "N/A";
  }
}

async function getWeather() {
  try {
    const response = await fetch(apiURL);
    if (!response.ok) throw new Error("Weather data not available");
    const data = await response.json();

    const description = data.weather[0].description;
    const temp = data.main.temp.toFixed(1);
    const humidity = data.main.humidity;
    const windSpeed = data.wind.speed.toFixed(1);
    const windChill = calculateWindChill(temp, windSpeed);

    document.getElementById("current-desc").textContent =
      description.charAt(0).toUpperCase() + description.slice(1);
    document.getElementById("current-temp").textContent = `${temp}°F`;
    document.getElementById("current-humid").textContent = `${humidity}%`;
    document.getElementById("current-windSpeed").textContent = `${windSpeed} mph`;
    document.getElementById("current-windChill").textContent =
      windChill === "N/A" ? "N/A" : `${windChill}°F`;

  } catch (error) {
    console.error("Error fetching weather:", error);
  }
}

getWeather();
