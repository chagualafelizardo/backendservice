import { Sequelize, DataTypes } from 'sequelize';
import db from "../config/database.js";
import Atendimento from '../models/Atendimento.js';
import User from '../models/User.js';
import PaymentCriteria from '../models/PaymentCriteria.js';

const Pagamento = db.define("pagamentos", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  valorTotal: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false,
  },
  data: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  status: {
    type: DataTypes.ENUM('pending', 'confirmed', 'rejected'),
    defaultValue: 'pending',
    allowNull: false,
  },
  atendimentoId: {
    type: DataTypes.INTEGER,
    references: {
      model: 'atendimentos',
      key: 'id',
    },
    allowNull: false,
    onDelete: 'CASCADE',
  },
  userId: {
    type: DataTypes.INTEGER,
    references: {
      model: 'users',
      key: 'id',
    },
    allowNull: false,
    onDelete: 'CASCADE',
  },
  criterioPagamentoId: {
    type: DataTypes.INTEGER,
    references: {
      model: 'paymentCriteria',
      key: 'id',
    },
    allowNull: false,
    onDelete: 'CASCADE',
  },
}, {
  // Adicionando índices para melhor performance nas consultas por status
  indexes: [
    {
      fields: ['status']
    },
    {
      fields: ['atendimentoId']
    },
    {
      fields: ['userId']
    }
  ]
});

export default Pagamento;