const jwt = require('jsonwebtoken');
const ApiError = require('../utils/ApiError');
const config = require('../config/config.json');

const CONFIRM_TOKEN = config.jwt.jwt_confirm_secret;
const UNSUBSCRIBE_TOKEN = config.jwt.jwt_unsubscribe_secret;

class TokenService {
    generateConfirmToken(payload) {
        const confirmToken = jwt.sign(payload, CONFIRM_TOKEN, {expiresIn: config.jwt.confirm_expire_at})
        return confirmToken
    }

    generateUnsubscribeToken(payload) {
        const unsubscribeToken = jwt.sign(payload, UNSUBSCRIBE_TOKEN);
        return unsubscribeToken;
    }

    validateConfirmToken(token) {
        try {
            return jwt.verify(token, CONFIRM_TOKEN);
        } catch (error) {
            if (err.name === 'JsonWebTokenError') {
                throw ApiError.NotFound("Token not found");
            } else if (err.name === 'TokenExpiredError') {
                throw ApiError.BadRequest("Invalid token");
            } else {
                throw ApiError.BadRequest("Unknown JWT error", error);
            }
        }
    }

    validateUnsubscribeToken(token) {
        try {
            return jwt.verify(token, UNSUBSCRIBE_TOKEN);
        } catch (error) {
            if (err.name === 'JsonWebTokenError') {
                throw ApiError.BadRequest("Invalid token");
            } else {
                throw ApiError.BadRequest("Unknown JWT error", error);
            }
        }
    }

}

module.exports = new TokenService();