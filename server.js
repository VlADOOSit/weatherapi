require('dotenv').config();
const app = require('./app');
const sequelize = require('./db/db');
const config = require('./config/config.json');

const WeatherScheduleService = require('./services/weather-schedule-service');

const PORT = process.env.PORT || config.server.port;
const HOST = process.env.HOST || config.server.host;

WeatherScheduleService.start();

(async () => {
    try {
        await sequelize.authenticate();
        console.log('Database connected');

        app.listen(PORT, HOST, () => {
        console.log(`Server start on https://${HOST}:${PORT}`);
        });
    } catch (err) {
        console.error('DB error:', err);
    }
})();