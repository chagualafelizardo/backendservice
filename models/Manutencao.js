import { Sequelize, DataTypes } from 'sequelize';
import db from "../config/database.js";
import Veiculo from '../models/Veiculo.js'; // Importe o modelo Veiculo
import Oficina from '../models/Oficina.js'; // Importe o modelo Oficina
import Atendimento from '../models/Atendimento.js'; // Importe o modelo Atendimento

const Manutencao = db.define("manutencao", {
  data_entrada: {
    type: DataTypes.DATE,
    allowNull: true, // Agora a data de entrada pode ser nula
  },
  data_saida: {
    type: DataTypes.DATE,
    allowNull: true, // A data de saída pode ser nula (caso a manutenção ainda esteja em andamento)
  },
  obs: {
    type: DataTypes.STRING(255),
    allowNull: true, // A observação pode ser nula
  },
  // Chave estrangeira para Veiculo
  veiculoID: {
    type: DataTypes.INTEGER,
    references: {
      model: 'veiculos', // Nome da tabela associada
      key: 'id'
    },
    allowNull: true, // Agora o veículo pode ser nulo
    onDelete: 'CASCADE', // Exclui a manutenção se o veículo for excluído
    onUpdate: 'CASCADE' // Atualiza a manutenção se o ID do veículo for atualizado
  },
  // Chave estrangeira para Oficina
  oficinaID: {
    type: DataTypes.INTEGER,
    references: {
      model: 'oficinas', // Nome da tabela associada
      key: 'id'
    },
    allowNull: true, // Agora a oficina pode ser nula
    onDelete: 'CASCADE', // Exclui a manutenção se a oficina for excluída
    onUpdate: 'CASCADE' // Atualiza a manutenção se o ID da oficina for atualizado
  },
  // Chave estrangeira para Atendimento
  atendimentoID: {
    type: DataTypes.INTEGER,
    references: {
      model: 'atendimentos', // Nome da tabela associada
      key: 'id'
    },
    allowNull: false, // O atendimento é obrigatório
    onDelete: 'CASCADE', // Exclui a manutenção se o atendimento for excluído
    onUpdate: 'CASCADE' // Atualiza a manutenção se o ID do atendimento for atualizado
  }
});

// Definir as associações com os modelos Veiculo, Oficina e Atendimento
Veiculo.hasMany(Manutencao, { foreignKey: 'veiculoID' }); // Um veículo pode ter muitas manutenções
Manutencao.belongsTo(Veiculo, { foreignKey: 'veiculoID' }); // Uma manutenção pertence a um veículo

Oficina.hasMany(Manutencao, { foreignKey: 'oficinaID' }); // Uma oficina pode ter muitas manutenções
Manutencao.belongsTo(Oficina, { foreignKey: 'oficinaID' }); // Uma manutenção pertence a uma oficina

Atendimento.hasMany(Manutencao, { foreignKey: 'atendimentoID' }); // Um atendimento pode ter muitas manutenções
Manutencao.belongsTo(Atendimento, { foreignKey: 'atendimentoID' }); // Uma manutenção pertence a um atendimento

export default Manutencao;