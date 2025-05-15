'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
    const fs = require('fs');
    const path = require('path');
    const sql = fs.readFileSync(path.join(__dirname, '../db/sql/init.sql'), 'utf8');
    return queryInterface.sequelize.query(sql);
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
    return queryInterface.sequelize.query('DROP TABLE IF EXISTS "Subscriptions";');
  }
};
