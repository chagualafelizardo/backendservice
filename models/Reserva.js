import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';
import User from './User.js';
import Veiculo from './Veiculo.js';

const Reserva = sequelize.define('reserva', {
  date: {
    type: DataTypes.DATE,
  },
  destination: {
    type: DataTypes.STRING,
  },
  number_of_days: {
    type: DataTypes.INTEGER,
  },
  userID: {
    type: DataTypes.INTEGER,
    references: { model: 'users', key: 'id' },
    onDelete: 'CASCADE',
    allowNull: false,
  },
  clientID: {
    type: DataTypes.INTEGER,
    references: { model: 'users', key: 'id' },
    onDelete: 'CASCADE',
    allowNull: false,
  },
  veiculoID: {
    type: DataTypes.INTEGER,
    references: { model: 'veiculos', key: 'id' },
    onDelete: 'CASCADE',
    allowNull: false,
  },
  state: {
      type: DataTypes.ENUM('Not Confirmed', 'Confirmed'),
      defaultValue: 'Not Confirmed',
    },
  }, {
    timestamps: true,
});

export default Reserva;
