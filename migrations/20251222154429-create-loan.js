'use strict';
/** @type {import('sequelize-cli').Migration} */
export async function up(queryInterface, Sequelize) {
  await queryInterface.createTable('Loans', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER
    },
    userId: {
      type: Sequelize.INTEGER
    },
    bookId: {
      type: Sequelize.INTEGER
    },
    loanDate: {
      type: Sequelize.DATE
    },
    dueDate: {
      type: Sequelize.DATE,
      allowNull: false
    },
    returnDate: {
      type: Sequelize.DATE
    },
    status: {
      type: Sequelize.STRING
    },
    fine: {
      type: Sequelize.INTEGER
    },
    createdAt: {
      allowNull: false,
      type: Sequelize.DATE
    },
    updatedAt: {
      allowNull: false,
      type: Sequelize.DATE
    }
  });
}
export async function down(queryInterface, Sequelize) {
  await queryInterface.dropTable('Loans');
}