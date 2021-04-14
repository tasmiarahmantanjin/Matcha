'use strict';

const bcrypt = require('bcrypt');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
     await queryInterface.bulkInsert('Users', [
      {
        firstName: 'Tasmia',
        lastName: 'Rahman',
        userName: 'tasmia',
        email: 'tasmiata@gmail.com',
        password: bcrypt.hashSync('secret', 10),
        gender: 'female'
      },
      {
        firstName: 'Shakilur',
        lastName: 'Rahman',
        userName: 'tasmiata',
        email: 'shakil@gmail.com',
        password: 'secret',
        gender: 'male'
      },
      {
        firstName: 'Tanjin',
        lastName: 'Rahman',
        userName: 'tasmiatan',
        email: 'tanjin@gmail.com',
        password: 'secret',
        gender: 'female'
      }
    ])
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */

     await queryInterface.bulkDelete('Users', null, {});
  }
};
