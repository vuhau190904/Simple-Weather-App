const axios = require('axios');
require('dotenv').config();

const API_KEY = process.env.API_KEY;
const getWeatherData = (address, callback) => {
    const url = `http://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(address)}&units=metric&appid=${API_KEY}`;
    axios.get(url)
        .then(response => {
            callback(response.data);
        })
        .catch(error => {
            callback("Unable to fetch data, Please try again. " + error);
        });
};

module.exports = getWeatherData;