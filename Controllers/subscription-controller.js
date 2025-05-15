const ApiError = require('../utils/ApiError');
const Subscription = require('../Models/Subscription');

class SubscriptionComtroller {
    async test(req, res, next) {
        try {
            await Subscription.create({
                email: 'user5@example.com',
                last_sent_at: new Date(),
                city: 'Kyiv',
                frequency: 'daily'
            });

            return res.sendStatus(200);

        } catch(e) {
            next(e);
        }
    }
}

module.exports = new SubscriptionComtroller();