import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';
import User from './User.js';
import Role from './Role.js';

const UserRole = sequelize.define('userRole', {
  userId: {
    type: DataTypes.INTEGER,
    references: {
      model: User,
      key: 'id',
    },
  },
  roleId: {
    type: DataTypes.INTEGER,
    references: {
      model: Role,
      key: 'id',
    },
  },
}, {
  timestamps: true,
});

export default UserRole;
