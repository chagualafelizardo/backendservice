import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';
import User from './User.js';

const BankDetails = sequelize.define('bankDetails', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  bankName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  accountNumber: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  accountType: {
    type: DataTypes.ENUM('savings', 'current'),
    allowNull: false,
  },
  mpesaAccountNumber: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  eMolaAccountNumber: {
    type: DataTypes.STRING,
    allowNull: false,
  },
}, {
  timestamps: true,
});

export default BankDetails;
