import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';

const Multa = sequelize.define('multa', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  description: {
    type: DataTypes.STRING(255),
    allowNull: false,
    validate: {
      notEmpty: {
        msg: 'A descrição da multa é obrigatória'
      },
      len: {
        args: [3, 255],
        msg: 'A descrição deve ter entre 3 e 255 caracteres'
      }
    }
  },
  valorpagar: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false,
    validate: {
      isDecimal: {
        msg: 'O valor deve ser um número decimal'
      },
      min: {
        args: [0],
        msg: 'O valor não pode ser negativo'
      }
    }
  },
  observation: {
    type: DataTypes.TEXT,
    allowNull: true,
    validate: {
      len: {
        args: [0, 1000],
        msg: 'A observação não pode exceder 1000 caracteres'
      }
    }
  }
}, {
  timestamps: true,
  paranoid: true, // Para soft delete (opcional)
  underscored: true, // Para usar snake_case no banco
  tableName: 'multas' // Nome da tabela no banco
});

export default Multa;