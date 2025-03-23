import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';

const VeiculoDetails = sequelize.define("VeiculoDetails", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  description: {
    type: DataTypes.STRING(255),
    allowNull: false, // Campo obrigatório
  },
  startDate: {
    type: DataTypes.DATE,
    allowNull: false, // Campo obrigatório
  },
  endDate: {
    type: DataTypes.DATE,
    allowNull: false, // Campo obrigatório
  },
  obs: {
    type: DataTypes.STRING(255),
    allowNull: true, // Campo opcional
  },
  veiculoId: { // Chave estrangeira para o modelo Veiculo
    type: DataTypes.INTEGER,
    allowNull: false, // Campo obrigatório
    references: {
      model: 'veiculos', // Nome da tabela do modelo Veiculo
      key: 'id', // Chave primária do modelo Veiculo
    },
    onDelete: 'CASCADE', // Se o veículo for deletado, os detalhes também serão
  },
});

export default VeiculoDetails;