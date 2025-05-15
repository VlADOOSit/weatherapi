const Router = require('express').Router;
const subscriptionController = require('../Controllers/subscription-controller');

const router = new Router();

router.post('/', subscriptionController.test);

module.exports = router;