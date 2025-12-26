'use strict';
import { Model } from 'sequelize';
export default (sequelize, DataTypes) => {
  class Loan extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Loan.belongsTo(models.Book, { foreignKey: 'bookId' });
      Loan.belongsTo(models.User, { foreignKey: 'userId' });
    }
  }
  Loan.init({
    userId:{
     type: DataTypes.INTEGER, allowNull: false},
    bookId: {
      type: DataTypes.INTEGER, allowNull: false},
    loanDate: {
      type: DataTypes.DATE, allowNull: false
    },
    dueDate: {
      type: DataTypes.DATE, allowNull: false
    },
    returnDate: {
      type: DataTypes.DATE
    },
    status: {
      type: DataTypes.ENUM('dipinjam', 'dikembalikan'), defaultValue: 'dipinjam'
    },
    fine: {
      type: DataTypes.INTEGER, defaultValue: 0
    }
  }, {
    sequelize,
    modelName: 'Loan',
  });
  return Loan;
};