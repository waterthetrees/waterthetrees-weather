import NodeCache from 'node-cache';
import logger from './logger.js';
import { inspect } from 'util';
import { validateWeather } from './validation.js';
import dotenv from 'dotenv';
dotenv.config();

const WEATHERAPI_KEY= process.env.WEATHERAPI_KEY;
const WEATHERAPI_URL =' https://api.weatherapi.com/v1/forecast.json';

// TODO cache weather data for call from front end?
const weatherCache = new NodeCache({
  stdTTL: 86400, // 86400 is one day
  checkperiod: 600, // default
  deleteOnExpire: true,
}); // 5184000 is one month

const featureFlags = { test: true };

async function fetchData(url) {
  try {
    const response = await fetch(url);
    return await response.json();
  } catch (err) {
    logger.error(`CATCH ${url} ${inspect(err, false, 2, true)} CATCH `);
    return err;
  }
}

async function startWeather() {
  try {
    const runStartTime = new Date();

    const cityData = await fetchData('http://localhost:3002/api/cities');
    const cities = (featureFlags.test) ? cityData.slice(0, 1) : cityData;
    // console.log(`cities ${inspect(cities, false, 2, true)}`);

    let count = 0;
    for (const city of await cities) {
      const weather = await fetchData(`${WEATHERAPI_URL}?key=${WEATHERAPI_KEY}&q=${city.city}&days=${5}`);
      console.log(`weather ${inspect(await weather, false, 3, true)}`);
      // const validated = (await weather) ? validateWeather(await  weather) : false;
      // const sentToDb = (validated) ? await insertWeather(await response) : null;
      count += 1;
    }
    if (count >= cities.length) {
      const runEndTime = new Date();
      logger.verbose(`START: ${runStartTime}`);
      logger.verbose(`END:   ${runEndTime}`);
      setTimeout(() => process.exit(1), 10000); // exit after 10 seconds
      return;
    }
  } catch (err) {
    logger.error(`CATCH ${inspect(err, false, 2, true)} CATCH `);
    return err;
  }
}

startWeather();

process.on('exit', (code) => {
  logger.debug(`__ About to exit with code ${code}\n`);
});
