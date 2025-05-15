const { Sequelize } = require('sequelize');
const config = require('../config/config.json');

const sequelize = new Sequelize(
  process.env.DB_NAME || config.db.DB_NAME,
  process.env.DB_USER || config.db.DB_USER, 
  process.env.DB_PASSWORD || config.db.DB_PASSWORD,
  {
    host: process.env.DB_HOST || config.db.DB_HOST,
    port: process.env.DB_PORT || config.db.DB_PORT,
    dialect: 'postgres',
    logging: false,
  }
);

module.exports = sequelize;