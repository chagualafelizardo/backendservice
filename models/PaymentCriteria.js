import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';

const PaymentCriteria = sequelize.define('paymentCriteria', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  activity: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  paymentType: {
    type: DataTypes.ENUM('Alojamento', 'PERDIEM','Motorista'),
    allowNull: false,
  },
  paymentMethod: {
    type: DataTypes.ENUM('cash', 'transfer', 'mobile_money'),
    allowNull: false,
  },
  paymentPeriod: {
    type: DataTypes.ENUM('daily', 'weekly', 'monthly', 'yearly'),
    allowNull: false,
  },
  amount: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
}, {
  timestamps: true,
});

export default PaymentCriteria;
