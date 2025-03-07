import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';
import User from './User.js';
import Atendimento from './Atendimento.js';
import Allocation from './Allocation.js';

const UserAtendimentoAllocation = sequelize.define('useratendimentoallocation', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  userId: {
    type: DataTypes.INTEGER,
    references: {
      model: User,
      key: 'id',
    },
    allowNull: false,
    onDelete: 'CASCADE', // Exclui o registro se o usuário for excluído
  },
  atendimentoId: {
    type: DataTypes.INTEGER,
    references: {
      model: Atendimento,
      key: 'id',
    },
    allowNull: false,
    onDelete: 'CASCADE', // Exclui o registro se o atendimento for excluído
  },
  allocationId: {
    type: DataTypes.INTEGER,
    references: {
      model: Allocation,
      key: 'id',
    },
    allowNull: false,
    onDelete: 'CASCADE', // Exclui o registro se a alocação for excluída
  },
}, {
  timestamps: true,
});

export default UserAtendimentoAllocation;
