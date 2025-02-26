import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';

const AtendimentoDocument = sequelize.define("AtendimentoDocument", {
  itemDescription: {
    type: DataTypes.STRING(255)
  },
  image: {
        type: DataTypes.BLOB,
        allowNull: true, // Pode ser null se a imagem não for obrigatória
  },
  atendimentoID: {
    type: DataTypes.INTEGER,
    references: { model: 'atendimentos', key: 'id' },
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
    allowNull: false
  }
});

export default AtendimentoDocument;
