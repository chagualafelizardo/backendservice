import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';

const VehicleSupply = sequelize.define('vehiclesupply', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  stock: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 0,
  },
}, {
  timestamps: true, // Adiciona os campos createdAt e updatedAt automaticamente
  tableName: 'vehiclesupply', // Define o nome da tabela no banco de dados
});

export default VehicleSupply;