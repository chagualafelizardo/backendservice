import { Sequelize, DataTypes } from 'sequelize';
import db from "../config/database.js";
import Veiculo from '../models/Veiculo.js'; // Importa o modelo Veiculo

const VehicleHistoryRent = db.define("VehicleHistoryRent", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  datavalor: {
    type: DataTypes.DATE,
    // allowNull: false // A data do valor é obrigatória
  },
  valor: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false // O valor é obrigatório
  },
  obs: {
    type: DataTypes.STRING(255),
    allowNull: true // Observações são opcionais
  },
  veiculoID: {
    type: DataTypes.INTEGER,
    references: {
      model: 'veiculos',
      key: 'id'
    },
    allowNull: false, // O histórico de valor deve sempre estar associado a um veículo
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE'
  }
});


export default VehicleHistoryRent;
