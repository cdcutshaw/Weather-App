function loadDefaultData () {
  getWeatherData('New York City', 'us')
}
loadDefaultData()

function handleSubmitSearch() {
  const searchBar = document.querySelector('.searchBar')
   searchBar.onsubmit = (event) => {
     event.preventDefault();
     const units = getUnits();
     const city = document.getElementById('city').value;
     getWeatherData(city, units);  
     searchBar.reset();
     return city
   }
 }
 handleSubmitSearch();

async function getWeatherData(city, units) {
    try {
      const response = await fetch(`https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${city}?iconSet=icons2&unitGroup=${units}&key=P89F5D9Z6MBHH3YMURCAY5CAW&contentType=json`);
      
      if (response.status === 400) {
        throw new Error(` invalid entry: please enter a valid city name`);
      }
  
      const weatherData = await response.json();
      processData(weatherData);
    } catch (error) {
      alert (error);
    }
  }

function processData (weatherData) {
   const processsedData = {
    city : weatherData.resolvedAddress,
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
   renderData(processsedData);
} 

function renderData (processedData) {
  document.querySelector('.city').textContent = processedData.city.charAt(0).toUpperCase() + processedData.city.slice(1);
  document.querySelector('.currentconditions').textContent = `Current Conditions: ${processedData.conditions}`
  document.querySelector('.icon').src = `icons/${processedData.icon}.svg`
  document.querySelector('.humidity').textContent = `Humidity: ${processedData.humidity}%`
  document.querySelector('.precipprob').textContent = `Chance of Precipitation: ${processedData.precipprob}%`
  document.querySelector('.pressure').textContent = `Pressure: ${processedData.pressure} mbar`
  document.querySelector('.uvindex').textContent = `UV Index: ${processedData.uvindex} `
  document.querySelector('.sunrise').textContent = `Sunrise: ${processedData.sunrise} `
  document.querySelector('.sunset').textContent = `Sunset: ${processedData.sunset} `
  document.querySelector('.moonphase').textContent = `Moonphase : ${processedData.moonphase} `

  const units = getUnits()
  if (units === 'us') {
    document.querySelector('.temp').textContent = `Current Temp: ${processedData.temp}°F`
    document.querySelector('.hi').textContent = `Hi : ${processedData.hi}°F`
    document.querySelector('.low').textContent = `Low: ${processedData.low}°F`
    document.querySelector('.feelslike').textContent = `Feels Like: ${processedData.feelslike}°F`
    document.querySelector('.wind').textContent = `Wind: ${processedData.wind} mph `
  }
  else if (units === 'metric'){
    document.querySelector('.temp').textContent = `Current Temp: ${processedData.temp}°C`
    document.querySelector('.hi').textContent = `Hi : ${processedData.hi}°C`
    document.querySelector('.low').textContent = `Low: ${processedData.low}°C`
    document.querySelector('.feelslike').textContent = `Feels Like: ${processedData.feelslike}°C`
    document.querySelector('.wind').textContent = `Wind: ${processedData.wind} km/h `
  }
} 

function handleUnitDropdown() {
  const unitSelector = document.getElementById('units');
  unitSelector.addEventListener("change", () => {
    const units = getUnits();
    const city = document.querySelector('.city').textContent;
    getWeatherData(city, units)
  } )
}
handleUnitDropdown()

function getUnits () {
  const unitval = document.getElementById('units').value;
  const unitvalLower = unitval.toLowerCase()
  return (unitvalLower)
}




