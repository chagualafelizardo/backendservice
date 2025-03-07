import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';

const Allocation = sequelize.define('allocation', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  startDate: {
    type: DataTypes.DATE,
    allowNull: false, // A data de início é obrigatória
  },
  endDate: {
    type: DataTypes.DATE,
    allowNull: false, // A data de término é obrigatória
  },
  destination: {
    type: DataTypes.STRING(255),
    allowNull: false, // O destino é obrigatório
  },
  paid: {
    type: DataTypes.BOOLEAN,
    defaultValue: false, // O valor padrão é 'false' (não pago)
  },
});

export default Allocation;
