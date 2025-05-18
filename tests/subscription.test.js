// tests/subscription.test.js
const request = require('supertest');
const app = require('../app');
const Subscription = require('../Models/Subscription');

jest.mock('../Models/Subscription');

describe('Subscription Controller', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    describe('POST /weatherapi.app/api/subscribe', () => {
        it('should return 400 if body is invalid', async () => {
            const res = await request(app).post('/weatherapi.app/api/subscribe').send({});
            expect(res.statusCode).toBe(400);
        });

        it('should return 409 if email already exists', async () => {
        Subscription.findAll.mockResolvedValue([{ id: 1 }]);
        const res = await request(app)
            .post('/weatherapi.app/api/subscribe')
            .send({ email: 'test@example.com', city: 'Kyiv', frequency: 'daily' });
        expect(res.statusCode).toBe(409);
        });

        it('should return 200 if subscription is successful', async () => {
        Subscription.findAll.mockResolvedValue([]);
        Subscription.create.mockResolvedValue({ id: 1 });
        const mockMail = require('../services/mail-service');
        mockMail.sendActivationMail = jest.fn();

        const mockWeather = require('../services/weather-service');
        mockWeather.parseWeatherByCity = jest.fn().mockResolvedValue({});

        const res = await request(app)
            .post('/weatherapi.app/api/subscribe')
            .send({ email: 'test@example.com', city: 'Kyiv', frequency: 'daily' });
        expect(res.statusCode).toBe(200);
        });
    });
});
