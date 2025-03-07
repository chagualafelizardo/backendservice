import { Sequelize, DataTypes } from 'sequelize';
import db from "../config/database.js";
import Manutencao from '../models/Manutencao.js'; // Importe o modelo Manutencao

const DetalhesManutencao = db.define("detalhesmanutencao", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  item: {
    type: DataTypes.STRING(255),
    allowNull: false, // O item é obrigatório
  },
  obs: {
    type: DataTypes.STRING(255),
    allowNull: true, // A observação pode ser nula
  },
  // Chave estrangeira para Manutencao
  manutencaoID: {
    type: DataTypes.INTEGER,
    references: {
      model: 'manutencaos', // Nome da tabela associada
      key: 'id',
    },
    allowNull: false, // A manutenção é obrigatória
    onDelete: 'CASCADE', // Exclui os detalhes se a manutenção for excluída
    onUpdate: 'CASCADE', // Atualiza os detalhes se o ID da manutenção for atualizado
  },
});

// Definir a associação com o modelo Manutencao
Manutencao.hasMany(DetalhesManutencao, { foreignKey: 'manutencaoID' }); // Uma manutenção pode ter muitos detalhes
DetalhesManutencao.belongsTo(Manutencao, { foreignKey: 'manutencaoID' }); // Um detalhe pertence a uma manutenção

export default DetalhesManutencao;