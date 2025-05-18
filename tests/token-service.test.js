const tokenService = require('../services/token-service');

describe('Token Service', () => {
    it('should generate and validate confirm token', () => {
        const token = tokenService.generateConfirmToken({ email: 'test@example.com' });
        const decoded = tokenService.validateConfirmToken(token);
        expect(decoded.email).toBe('test@example.com');
    });

    it('should generate and validate unsubscribe token', () => {
        const token = tokenService.generateUnsubscribeToken({ email: 'test@example.com' });
        const decoded = tokenService.validateUnsubscribeToken(token);
        expect(decoded.email).toBe('test@example.com');
    });

    it('should throw on invalid token', () => {
        expect(() => tokenService.validateConfirmToken('bad.token')).toThrow();
    });
});
