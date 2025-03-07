import { Sequelize, DataTypes } from 'sequelize';
import db from "../config/database.js";
import Atendimento from '../models/Atendimento.js'; // Importe o modelo Atendimento
import User from '../models/User.js'; // Importe o modelo User
import PaymentCriteria from '../models/PaymentCriteria.js'; // Importe o modelo PaymentCriteria

const Pagamento = db.define("pagamentos", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  valorTotal: {
    type: DataTypes.DECIMAL(10, 2), // Valor total com 2 casas decimais
    allowNull: false,
  },
  data: {
    type: DataTypes.DATE, // Campo para armazenar a data do pagamento
    allowNull: false,
  },
  // Chave estrangeira para Atendimento
  atendimentoId: {
    type: DataTypes.INTEGER,
    references: {
      model: 'atendimentos', // Nome da tabela associada
      key: 'id',
    },
    allowNull: false,
    onDelete: 'CASCADE', // Exclui o pagamento se o atendimento for excluído
  },
  // Chave estrangeira para User (Motorista)
  userId: {
    type: DataTypes.INTEGER,
    references: {
      model: 'users', // Nome da tabela associada
      key: 'id',
    },
    allowNull: false,
    onDelete: 'CASCADE', // Exclui o pagamento se o usuário for excluído
  },
  // Chave estrangeira para PaymentCriteria
  criterioPagamentoId: {
    type: DataTypes.INTEGER,
    references: {
      model: 'paymentCriteria', // Nome da tabela associada
      key: 'id',
    },
    allowNull: false,
    onDelete: 'CASCADE', // Exclui o pagamento se o critério de pagamento for excluído
  },
});

export default Pagamento;