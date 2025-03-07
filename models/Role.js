import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';

const Role = sequelize.define('role', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
}, {
  timestamps: true,  // Ativa createdAt e updatedAt
});

export default Role;
