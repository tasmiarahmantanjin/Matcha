// I need this file to create some predefined user's so that we can use them as a admin or as a common friends 
// This file has been created with the help following command: sequelize seed:create ---Name users

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
        password: bcrypt.hashSync('secret', 10),
        gender: 'male'
      },
      {
        firstName: 'Tanjin',
        lastName: 'Rahman',
        userName: 'tasmiatan',
        email: 'tanjin@gmail.com',
        password: bcrypt.hashSync('secret', 10),
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
