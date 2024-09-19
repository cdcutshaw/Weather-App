function handleSubmitSearch() {
  const searchBar = document.querySelector('.searchBar')
   searchBar.onsubmit = (event) => {
     event.preventDefault();
     const city = document.getElementById('city').value;
     getWeatherData(city);  
     searchBar.reset();
   }
 }
 handleSubmitSearch();

async function getWeatherData(city) {
    try {
      const response = await fetch(`https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${city}?iconSet=icons2&unitGroup=us&key=P89F5D9Z6MBHH3YMURCAY5CAW&contentType=json`);
      
      if (!response.ok) {
        throw new Error(`Error: ${response.status} - ${response.statusText}`);
      }
  
      const weatherData = await response.json();
      processData(weatherData);
    } catch (error) {
      alert (error);
    }
  }

function processData (weatherData) {
   const processsedData = {
    city : weatherData.address,
    conditions: weatherData.currentConditions.conditions,
    temp : weatherData.currentConditions.temp,
    icon : weatherData.currentConditions.icon,
    hi : weatherData.days[0].tempmax,
    low : weatherData.days[0].tempmin,
    feelslike: weatherData.currentConditions.feelslike,
    humidity : weatherData.currentConditions.humidity,
    precipprob : weatherData.currentConditions.precipprob,
    wind : weatherData.currentConditions.windspeed,
    pressure : weatherData.currentConditions.pressure,
    uvindex : weatherData.currentConditions.uvindex,
    sunrise : weatherData.currentConditions.sunrise,
    sunset : weatherData.currentConditions.sunset,
    moonphase : weatherData.currentConditions.moonphase,
   }
   console.log(weatherData)
   renderData(processsedData);
} 


function renderData (processedData) {
  document.querySelector('.city').textContent = processedData.city.charAt(0).toUpperCase() + processedData.city.slice(1);
  document.querySelector('.currentconditions').textContent = `Current Conditions: ${processedData.conditions}`
  document.querySelector('.temp').textContent = `Current Temp: ${processedData.temp}°F`
  document.querySelector('.icon').src = `icons/${processedData.icon}.svg`
  document.querySelector('.hi').textContent = `Hi : ${processedData.hi}°F`
  document.querySelector('.low').textContent = `Low: ${processedData.low}°F`
  document.querySelector('.feelslike').textContent = `Feels Like: ${processedData.feelslike}°F`
  document.querySelector('.humidity').textContent = `Humidity: ${processedData.humidity}%`
  document.querySelector('.precipprob').textContent = `Chance of Precipitation: ${processedData.precipprob}%`
  document.querySelector('.wind').textContent = `Wind: ${processedData.wind} mph`
  document.querySelector('.pressure').textContent = `Pressure: ${processedData.pressure} mbar`
  document.querySelector('.uvindex').textContent = `UV Index: ${processedData.uvindex} `
  document.querySelector('.sunrise').textContent = `Sunrise: ${processedData.sunrise} `
  document.querySelector('.sunset').textContent = `Sunset: ${processedData.sunset} `
  document.querySelector('.moonphase').textContent = `Moonphase : ${processedData.moonphase} `

} 



function handleDegreeDropdown() {
    const dropBtn = document.querySelector(".dropBtn");
    dropBtn.addEventListener("click", function() {
        document.getElementById("dropList").classList.toggle("show");
    });

    window.onclick = function(event) {
        if(!event.target.matches('.dropBtn')) {
            let dropdowns = document.getElementsByClassName("dropContent");
            let i;
            for (i = 0; i < dropdowns.length; i++) {
                let openDropdown = dropdowns[i];
                if(openDropdown.classList.contains('show')) {
                    openDropdown.classList.remove('show');
                }
            }
        }
    }
}
handleDegreeDropdown();