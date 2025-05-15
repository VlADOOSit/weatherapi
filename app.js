const express = require('express');
const sequelize = require('./db/db');
const config = require('./config/config.json');

const ErrorHandler = require('./Middlewares/errorHandler');

const WeatherRouter = require('./Routes/weather-router');
const SubscriptionRouter = require('./Routes/subscription-router');

const PORT = process.env.PORT || config.server.port;
const HOST = process.env.HOST || config.server.host;

const app = express();

app.use(express.json());

app.use('/weatherapi.app/api/weather', WeatherRouter);
app.use('/weatherapi.app/api/subscribe', SubscriptionRouter);

app.use(ErrorHandler);

(async () => {
    try {
        await sequelize.authenticate();
        console.log('Database connected');
  
       
        app.listen(PORT, () => {console.log(`Server start on https://${HOST}:${PORT}`)});
    } catch (err) {
        console.error('DB error:', err);
    }
})();
