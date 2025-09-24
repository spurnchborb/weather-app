// Weather API
const weatherApiKey = "54c1eb8e8a96a76cc3e3bc3696ac0e5c";
const weatherApiUrl = `https://api.openweathermap.org/data/2.5/weather?q=tooele&units=imperial&appid=${weatherApiKey}`;

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
    const response = await fetch(weatherApiUrl);
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

// News API
const newsApiKey = "849f23b141164d5f97552ed967a56139";
const newsApiUrl = `https://newsapi.org/v2/top-headlines?country=us&apiKey=${newsApiKey}`;

const mainArticleLink = document.getElementById("header-article");
const mainArticleDesc = document.getElementById("header-desc");
const mainArticleImg = document.querySelector(".main-article img");

const articleElements = [
  {
    link: document.getElementById("article-link-1"),
    img: document.getElementById("article-img-1"),
    desc: document.getElementById("article-desc-1")
  },
  {
    link: document.getElementById("article-link-2"),
    img: document.getElementById("article-img-2"),
    desc: document.getElementById("article-desc-2")
  },
  {
    link: document.getElementById("article-link-3"),
    img: document.getElementById("article-img-3"),
    desc: document.getElementById("article-desc-3")
  }
];

fetch(newsApiUrl)
  .then(response => response.json())
  .then(data => {
    const main = data.articles[0];
    mainArticleLink.textContent = main.title;
    mainArticleLink.href = main.url;
    mainArticleDesc.textContent = main.description || "No description available.";
    mainArticleImg.src = main.urlToImage || "img/placeholder.png";
    mainArticleImg.alt = main.title;

    data.articles.slice(1, 4).forEach((article, i) => {
      articleElements[i].link.textContent = article.title;
      articleElements[i].link.href = article.url;
      articleElements[i].img.src = article.urlToImage || "img/placeholder.png";
      articleElements[i].img.alt = article.title;
      articleElements[i].desc.textContent = article.description || "No description available.";
    });
  })
  .catch(err => console.error(err));
