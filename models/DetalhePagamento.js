import { Sequelize, DataTypes } from 'sequelize';
import db from '../config/database.js';
import Pagamento from '../models/Pagamento.js'; // Importe o modelo Pagamento

const DetalhePagamento = db.define('detalhePagamento', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  valorPagamento: {
    type: DataTypes.DECIMAL(10, 2), // Valor do pagamento com 2 casas decimais
    allowNull: false,
  },
  dataPagamento: {
    type: DataTypes.DATE, // Data do pagamento
    allowNull: false,
  },
  // Chave estrangeira para Pagamento
  pagamentoId: {
    type: DataTypes.INTEGER,
    references: {
      model: 'pagamentos', // Nome da tabela associada
      key: 'id',
    },
    allowNull: false,
    onDelete: 'CASCADE', // Exclui os detalhes se o pagamento for excluído
  },
});


export default DetalhePagamento;