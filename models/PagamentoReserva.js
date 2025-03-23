import { Sequelize, DataTypes } from 'sequelize';
import db from "../config/database.js";
import User from '../models/User.js'; // Importe o modelo User
import Reserva from './Reserva.js';

const PagamentoReserva = db.define("PagamentoReserva", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  valorTotal: {
    type: DataTypes.DECIMAL(10, 2), // Valor total com 2 casas decimais
    allowNull: false,
    validate: {
      isDecimal: true, // Garante que o valor seja um número decimal
      min: 0, // Garante que o valor não seja negativo
    },
  },
  data: {
    type: DataTypes.DATE, // Campo para armazenar a data do pagamento
    allowNull: false,
    defaultValue: Sequelize.NOW, // Define a data atual como valor padrão
  },
  // Chave estrangeira para User (Motorista)
  userId: {
    type: DataTypes.INTEGER,
    references: {
      model: User, // Referência ao modelo User
      key: 'id',
    },
    allowNull: false,
    onDelete: 'CASCADE', // Exclui o pagamento se o usuário for excluído
  },
  // Chave estrangeira para Atendimento
  reservaId: {
    type: DataTypes.INTEGER,
    references: {
      model: Reserva, // Referência ao modelo Atendimento
      key: 'id',
    },
    allowNull: false,
    onDelete: 'CASCADE', // Exclui o pagamento se o atendimento for excluído
  },
});


export default PagamentoReserva;