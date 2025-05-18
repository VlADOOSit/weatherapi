const config = require('../config/config.json');
const axios = require('axios');
const ApiError = require('../utils/ApiError');

const BASE_URL = config.weather_service.BASE_URL;
const API_KEY = process.env.WEATHER_API || config.weather_service.API_KEY;


class WeatherService {
    async parseWeatherByCity(city) {
        try {
            const response = await axios.get(`${BASE_URL}/current.json `, {
                params: {
                  key: API_KEY,
                  q: city
                }
            });
            
            return response;
        } catch (error) { 
            const data = error.response.data;

            if (error.response.status === 400) {
                if (data.error.code == 1006) {
                    throw ApiError.NotFound("City not found");
                }
                throw ApiError.BadRequest("Invalid request to weather API");
            }

            throw ApiError.Internal(
                `Weather API error: ${error.response.data?.error?.message || 'Unknown error'}`
            )
        }   
    }
}

module.exports = new WeatherService();
