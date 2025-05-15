const config = require('../config/config.json');

module.exports = {
    development: {
      username: config.db.DB_USER,
      password: config.db.DB_PASSWORD,
      database: config.db.DB_NAME,
      host: config.db.DB_HOST,
      port: config.db.DB_PORT,
      dialect: 'postgres'
    }
  };
  