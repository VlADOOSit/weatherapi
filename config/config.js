const config = require('../config/config.json');

module.exports = {
    development: {
      username: process.env.DB_USER || config.db.DB_USER,
      password: process.env.DB_PASSWORD || config.db.DB_PASSWORD,
      database: process.env.DB_NAME || config.db.DB_NAME,
      host: process.env.DB_HOST || config.db.DB_HOST,
      port: process.env.DB_PORT || config.db.DB_PORT,
      dialect: 'postgres'
    }
  };
  