

class HtmlConstructor {

    generateWeatherHtml(temperature, humidity, description, link) {
        return `
            <html>
            <body style="font-family: Arial, sans-serif; color: #333;">
                <h3 style="color: #2c3e50;">Weather data</h3>
                <p><strong>Temperature:</strong> ${temperature}°C</p>
                <p><strong>Humidity:</strong> ${humidity}%</p>
                <p><strong>Description:</strong> ${description}</p>

                <p>Click <a href="${link}">${link}</a>, to unsubscribe.</p>

            </body>
            </html>
        `;
    }
}

module.exports = new HtmlConstructor();