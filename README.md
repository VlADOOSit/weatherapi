# 🌦️ Weather App
Weather API application that allows users to subscribe to weather updates for their city.

---

## 🧱 Technology stack

- ⚙️ **Backend**: Node.js, Express, Sequelize ORM  
- 🗃️ **Database**: PostgreSQL  
- 🐳 **Infrastructure**: Docker + Docker Compose  

---

## 🔧 Main functionality

- REST API for getting weather data
- Ability to subscribe to mailing list and confirm mail
- Sequelize ORM with migrations and models
- Task schedule using `node-cron`
- Connection to PostgreSQL
- Configuration via `.env` and `config.json`
- Support for auto-running migrations when starting a container

---

## 🐳 To run

1. Create a .env file using the example
<pre lang="env"><code>
DB_USER=vkharkivsk
DB_PASSWORD=password
DB_NAME=weatherdb
DB_HOST=localhost
DB_PORT=5432

MAIL_USER=vlad.kharkovskiy22@gmail.com
MAIL_PASS=

WEATHER_API=

BASE_URL=http://localhost:3001/weatherapi.app/api</code></pre>
  Or fill in the file ./config/config.json

2. docker compose up -d

---

### Endpoints

- `GET /weather?city=Kyiv` – Get current weather.

  **Response:**
```json
{
  "temperature": 22.5,
  "humidity": 65,
  "description": "Partly cloudy"
}
```
- `POST /subscribe` – Subscribe with `email`, `city`, `frequency`.

    **Request body:**
```json
{
  "email": "vlad.kharkovl@gmail.com",
  "city": "Kyiv",
  "frequency": "hourly"
}
```

- `GET /confirm/{token}` – Confirm subscription.

- `GET /unsubscribe/{token}` – Unsubscribe.

---

# AWS EC2

The application was also deployed on EC2 with a very simple frontend. In this repository https://github.com/VlADOOSit/weatherapi-react you can see the structure of the common docker-compose file and nginx  

Link for app http://56.228.26.197
