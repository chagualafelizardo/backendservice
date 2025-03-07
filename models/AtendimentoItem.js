// models/AtendimentoItem.js
import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';

const AtendimentoItem = sequelize.define('AtendimentoItem', {
  atendimentoID: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  itemDescription: {
    type: DataTypes.STRING(255),
    allowNull: false,
  },
});

export default AtendimentoItem;
