import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';

const TipoMulta = sequelize.define('tipomulta', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  description: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  valorpagar: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false,
    defaultValue: 0.00,
    validate: {
      isDecimal: true, 
      min: 0,
    },
  },
}, {
  timestamps: true,  // Ativa createdAt e updatedAt
});

export default TipoMulta;
