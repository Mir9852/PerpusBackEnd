'use strict';

import { hash } from 'bcrypt';

/** @type {import('sequelize-cli').Migration} */
export async function up(queryInterface) {

  await queryInterface.bulkInsert('Users', [
    {
      name: 'Admin',
      username: 'admin',
      password: await hash('admin123', 10),
      role: 'admin',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      name: 'Siswa Pertama',
      username: 'siswa',
      password: await hash('siswa123', 10),
      role: 'siswa',
      createdAt: new Date(),
      updatedAt: new Date()
    }
  ]);
}
export async function down(queryInterface) {
  await queryInterface.bulkDelete('Users', null, {});
}
