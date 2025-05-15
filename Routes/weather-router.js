const Router = require('express').Router;
const weatherController = require('../Controllers/weather-controller');

const router = new Router();

router.get('/', weatherController.getWeatherByCity);

module.exports = router;