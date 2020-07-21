const axios = require('axios');
const dotenv = require('dotenv');

const { parsed: config } = dotenv.config();

const { TOKEN } = config;

const URL = (lat = '35.206390', lng ='128.566699') => `http://api.openweathermap.org/data/2.5/weather?lon=${lng}&lat=${lat}&appid=${TOKEN}`;

async function getWeather(lat, lng) {
  if (!lat || !lng) throw new Error('lat and lng are required');

  const { data } = await axios.get(URL(lat, lng));

  const weather = data.weather[0].main;
  const temp = Math.floor(data.main.temp - 273);
  const city = data.name;

  return { weather, temp, city };
}

(async () => {
  const { weather, temp, city } = await getWeather('35.206390', '128.566699');

  console.log(`${city}의 날씨는 ${weather}입니다.`);
  console.log(`${city}의 온도는 ${temp}입니다.`);
})();
