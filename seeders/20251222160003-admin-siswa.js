'use strict';

const bcrypt = require('bcrypt');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface) {

    await queryInterface.bulkInsert('Users', [
      {
        name: 'Admin',
        username: 'admin',
        password: await bcrypt.hash('admin123', 10),
        role: 'admin',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Siswa Pertama',
        username: 'siswa',
        password: await bcrypt.hash('siswa123', 10),
        role: 'siswa',
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ]);
  },

  async down (queryInterface) {
   await queryInterface.bulkDelete('Users', null, {});
  }
};
