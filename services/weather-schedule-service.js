const cron = require('node-cron');
const dayjs = require('dayjs');
const utc = require('dayjs/plugin/utc');
const Subscription = require('../Models/Subscription');
const weatherService = require('./weather-service');
const mailService = require('./mail-service');
const config = require('../config/config.json');
dayjs.extend(utc);

class WeatherScheduleService {
    start() {
    
    cron.schedule('*/5 * * * *', async () => {
    	const subscriptions = await Subscription.findAll({
            where: {
                email_confirmed: true,
            },
        });
		const now = dayjs.utc();
        
		for (const subscription of subscriptions) {
            const lastSent = dayjs.utc(subscription.last_sent_at);

            const diffMinutes = now.diff(lastSent, 'minute');

			const shouldSend =
			(subscription.frequency === 'hourly' && diffMinutes >= 60) ||
			(subscription.frequency === 'daily' && diffMinutes >= 1140);

			if (shouldSend) {
				try {
					const weatherServiceResponse = await weatherService.parseWeatherByCity(subscription.city);
					const unsubscribeLink = `${config.server.BASE_URL}/unsubscribe/${subscription.unsubscribe_token}`;

					await mailService.sendWeather(subscription.email, 
									weatherServiceResponse.data.current.temp_c, 
									weatherServiceResponse.data.current.humidity, 
									weatherServiceResponse.data.current.condition.text, 
									unsubscribeLink);
            
					subscription.last_sent_at = dayjs.utc().toDate();
					await subscription.save();
					console.log('Updated last_sent_at:', subscription.last_sent_at);
				} catch (err) {
					console.error(`Error sending weather to ${subscription.email}:`, err);
				}
			}
		}
		});

		console.log('WeatherScheduler started: running every 5 minutes');
	}
}

module.exports = new WeatherScheduleService();
