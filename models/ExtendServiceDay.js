import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';

const ExtendServiceDay = sequelize.define('extendserviceday', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  date: {
    type: DataTypes.DATEONLY,
    allowNull: false,
  },
  notes: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  atendimentoId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
}, {
  timestamps: true, // cria createdAt e updatedAt automaticamente
});

export default ExtendServiceDay;
