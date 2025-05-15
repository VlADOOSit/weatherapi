const express = require('express');
const config = require('./config.json');

const ErrorHandler = require('./Middlewares/errorHandler');

const WeatherRouter = require('./Routes/weather-router');

const PORT = process.env.PORT || config.server.port;
const HOST = process.env.PORT || config.server.host;

const app = express();

app.use(express.json());

app.use('/weatherapi.app/api/weather', WeatherRouter);

app.use(ErrorHandler);

app.listen(PORT, () => {console.log(`Server start on https://${HOST}:${PORT}`)});
