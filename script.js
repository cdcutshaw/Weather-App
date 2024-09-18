

async function getWeatherData(city) {
    try {
      const response = await fetch(`https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${city}?unitGroup=us&key=P89F5D9Z6MBHH3YMURCAY5CAW&contentType=json`);
      
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
   const displayData = {
    conditions: weatherData.currentConditions.conditions,
    icon : weatherData.currentConditions.icon,
    temp : weatherData.currentConditions.temp,
    feelsLike: weatherData.currentConditions.feelslike,
    hi : weatherData.days[0].tempmax,
    low : weatherData.days[0].tempmin,
    precipprob : weatherData.currentConditions.precipprob,
    humidity : weatherData.currentConditions.humidity,
    wind : weatherData.currentConditions.windspeed,
    uvindex : weatherData.currentConditions.uvindex,
    pressure : weatherData.currentConditions.pressure,
    sunrise : weatherData.currentConditions.sunrise,
    sunset : weatherData.currentConditions.sunset,
    moonphase : weatherData.currentConditions.moonphase,
   }
   console.log(weatherData);
   console.log(displayData);
   return displayData;
    
} 
getWeatherData('knoxville')
