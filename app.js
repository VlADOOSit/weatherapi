require('dotenv').config();
const express = require('express');
const cors = require('cors');

const ErrorHandler = require('./Middlewares/errorHandler');

const WeatherRouter = require('./Routes/weather-router');
const SubscriptionRouter = require('./Routes/subscription-router');

const app = express();

app.use(cors());
app.use(express.json());

app.use('/weatherapi.app/api', SubscriptionRouter);
app.use('/weatherapi.app/api/weather', WeatherRouter);

app.use(ErrorHandler);

module.exports = app;