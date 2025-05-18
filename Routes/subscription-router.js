const Router = require('express').Router;
const subscriptionController = require('../Controllers/subscription-controller');

const router = new Router();

router.post('/subscribe', subscriptionController.subscribeToRecive);
router.get('/confirm/:token', subscriptionController.confirmEmail);
router.get('/unsubscribe/:token', subscriptionController.unsubscribe);

module.exports = router;