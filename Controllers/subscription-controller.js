const dayjs = require('dayjs');
const utc = require('dayjs/plugin/utc');
const ApiError = require('../utils/ApiError');
const weatherService = require('../services/weather-service');
const mailService = require('../services/mail-service');
const tokenService = require('../services/token-service');
const Subscription = require('../Models/Subscription');
const config = require('../config/config.json');
var validator = require('validator');
dayjs.extend(utc);

const BASE_URL = process.env.BASE_URL || config.server.BASE_URL;

class SubscriptionComtroller {
    async subscribeToRecive(req, res, next) {
        try {
            if (!req.body.email || !req.body.city || !req.body.frequency) {
                return next(ApiError.BadRequest("Incorrect request body"));
            }

            if(!validator.isEmail(req.body.email)) {
                return next(ApiError.BadRequest("Incorrect email"));
            }

            const subscriptionByEmail = await Subscription.findAll({
                where: {
                    email: req.body.email,
                },
            });

            if (subscriptionByEmail.length != 0 ) {
                return next(ApiError.Conflict("Email already exist"));
            }

            const weatherServiceResponse = await weatherService.parseWeatherByCity(req.body.city);

            const confirmToken = tokenService.generateConfirmToken({ email: req.body.email });
            const unsubscribeToken = tokenService.generateUnsubscribeToken({ email: req.body.email });

            await Subscription.create({
                email: req.body.email,
                city: req.body.city,
                frequency: req.body.frequency,
                unsubscribe_token: unsubscribeToken
            });
            
            const confirmLink = `${BASE_URL}/confirm/${confirmToken}`
            await mailService.sendActivationMail(req.body.email, confirmLink)

            return res.sendStatus(200);

        } catch(e) {
            next(e);
        }
    }

    async confirmEmail(req, res, next) {
        try {
            const { email } = tokenService.validateConfirmToken(req.params.token);

            const subscriptionByEmail = await Subscription.findOne({
                where: {
                    email: email,
                },
            });

            if (!subscriptionByEmail) {
                return next(ApiError.BadRequest("Subscription not found"))
            }

            subscriptionByEmail.email_confirmed = true;
            
            subscriptionByEmail.last_sent_at = dayjs.utc().toDate();
            await subscriptionByEmail.save();

            const unsubscribeLink = `${BASE_URL}/unsubscribe/${subscriptionByEmail.unsubscribe_token}`;

            const weatherServiceResponse = await weatherService.parseWeatherByCity(subscriptionByEmail.city);
            await mailService.sendWeather(email, 
                weatherServiceResponse.data.current.temp_c, 
                weatherServiceResponse.data.current.humidity, 
                weatherServiceResponse.data.current.condition.text, 
                unsubscribeLink);

            return res.status(200).json("Subscription confirmed successfully");
        } catch(e) {
            next(e);
        }
    }

    async unsubscribe(req, res, next) {
        try {
            const subscriptionByToken = await Subscription.findOne({
                where: {
                    unsubscribe_token: req.params.token,
                },
            });

            if(!subscriptionByToken) {
                return next(ApiError.NotFound("Token not found"));
            }

            tokenService.validateUnsubscribeToken(req.params.token);

            await subscriptionByToken.destroy();

            res.status(200).json("You have successfully unsubscribed");

        } catch(e) {
            next(e);
        }
    }
}

module.exports = new SubscriptionComtroller();