const nodemailer = require('nodemailer');
const htmlConstructor = require('../utils/htmlConstructor');
const config = require("../config/config.json");

class MailService {

    constructor() {
        this.transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.MAIL_USER || config.mail.user,
                pass: process.env.MAIL_PASS || config.mail.pass
            }
        });
    }

    async sendWeather(to, temperature, humidity, description, link) {
        await this.transporter.sendMail({
            from: `WeatherAPI <${config.mail.user}>`,
            to,
            subject: 'Weather subscription',
            text: '',
            html: htmlConstructor.generateWeatherHtml(temperature, humidity, description, link)

        });
    }

    async sendActivationMail(to, link) {
        await this.transporter.sendMail({
            from: `WeatherAPI <${config.mail.user}>`,
            to,
            subject: 'Activation email',
            text: '',
            html: `<p>Click <a href="${link}">${link}</a>, for confirm email.</p>`

        });
    }
}

module.exports = new MailService();