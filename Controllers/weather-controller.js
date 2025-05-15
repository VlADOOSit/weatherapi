const ApiError = require('../utils/ApiError');
const weatherService = require('../services/weather-service');

class WeatherController {
    async getWeatherByCity(req, res, next) {
        try {
            if (!req.query.city) {
                return next(ApiError.BadRequest("Incorrect query params"));
            }
            
            const weatherServiceResponse = await weatherService.parseWeatherByCity(req.query.city);

            return res.status(200).json({
                temperature: weatherServiceResponse.data.current.temp_c,
                humidity: weatherServiceResponse.data.current.humidity,
                description: weatherServiceResponse.data.current.condition.text
            });

        } catch(e) {
            next(e);
        }
    }
}

module.exports = new WeatherController();