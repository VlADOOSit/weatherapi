const ApiError = require('../utils/ApiError');
const Subscription = require('../Models/Subscription');

class SubscriptionComtroller {
    async subscribeToRecive(req, res, next) {
        try {
            if (!req.body.email || !req.body.city || !req.body.frequency) {
                return next(ApiError.BadRequest("Incorrect request body"));
            }

            const subscriptionByEmail = await Subscription.findAll({
                where: {
                    email: req.body.email,
                },
            });

            if (subscriptionByEmail.length != 0 ) {
                return next(ApiError.Conflict("Email already exist"));
            }

            await Subscription.create({
                email: req.body.email,
                last_sent_at: new Date(),
                city: req.body.city,
                frequency: req.body.frequency
            });

            return res.sendStatus(200);

        } catch(e) {
            next(e);
        }
    }
}

module.exports = new SubscriptionComtroller();