import { Sequelize, DataTypes } from 'sequelize';
import db from "../config/database.js";
import Reserva from '../models/Reserva.js';

const Atendimento = db.define("atendimento", {
  data_saida: {
    type: DataTypes.DATE
  },
  data_chegada: {
    type: DataTypes.DATE
  },
  data_devolucao: {
    type: DataTypes.DATE
  },
  destino: {
    type: DataTypes.STRING(255)
  },
  km_inicial: {
    type: DataTypes.DOUBLE
  },
  km_final: {
    type: DataTypes.DOUBLE
  },
  // Chave estrangeira para Reserva
  reservaId: {
    type: DataTypes.INTEGER,
    references: {
      model: 'reservas', // Nome da tabela associada
      key: 'id'
    },
    allowNull: false,
    onDelete: 'CASCADE' // Exclui os atendimentos se a reserva for excluída
  }
});

// Definir a associação com o model Reserva
Reserva.hasMany(Atendimento, { foreignKey: 'reservaId' }); // Uma reserva tem muitos atendimentos
Atendimento.belongsTo(Reserva, { foreignKey: 'reservaId' }); // Um atendimento pertence a uma reserva

export default Atendimento;
