import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';

const User = sequelize.define('user', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  username: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  firstName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  lastName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  gender: {
    type: DataTypes.CHAR(1),
    allowNull: false
  },
  birthdate: {
    type: DataTypes.DATE,
    allowNull: false
  },
  address: {
    type: DataTypes.STRING(255),
  },
  neighborhood: {
    type: DataTypes.STRING(255),
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  phone1: {
    type: DataTypes.STRING, // Alterado para STRING para permitir formatação
    unique: true,
  },
  phone2: {
    type: DataTypes.STRING, // Alterado para STRING para permitir formatação
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  img: {
    type: DataTypes.BLOB, // Alterado para BLOB para armazenar dados binários
    allowNull: true,
  },
  state: {
    type: DataTypes.ENUM('active', 'inactive'),
    defaultValue: 'inactive',
  },
}, {
  timestamps: true,
});

export default User;
