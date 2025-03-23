import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';
import Veiculo from './Atendimento.js';

const DriveDeliver = sequelize.define('driverdeliver', {
  date: {
    type: DataTypes.DATE,
  },
  deliver: {
    type: DataTypes.ENUM('No', 'Yes'),
    defaultValue: 'No',
  },
  pickupLatitude: {
    type: DataTypes.FLOAT,
    allowNull: true, // Campo opcional
  },
  pickupLongitude: {
    type: DataTypes.FLOAT,
    allowNull: true, // Campo opcional
  },
  dropoffLatitude: {
    type: DataTypes.FLOAT,
    allowNull: true, // Campo opcional
  },
  dropoffLongitude: {
    type: DataTypes.FLOAT,
    allowNull: true, // Campo opcional
  },
  locationDescription: {
    type: DataTypes.STRING(255),
    allowNull: true, // Campo opcional
  },
}, {
  timestamps: true,
});

export default DriveDeliver;
