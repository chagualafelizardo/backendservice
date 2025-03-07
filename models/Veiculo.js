import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';

const Veiculo = sequelize.define("veiculo", {
    matricula: {
        type: DataTypes.STRING(255),
        allowNull: false,
        unique: true
    },
    marca: {
        type: DataTypes.STRING(255),
        allowNull: false,
    },
    modelo: {
        type: DataTypes.STRING(255),
        allowNull: false,
    },
    ano: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    cor: {
        type: DataTypes.STRING(255),
        allowNull: false,
    },
    image: {
        type: DataTypes.BLOB,
        allowNull: true, // Pode ser null se a imagem não for obrigatória
    },
    num_chassi: {
        type: DataTypes.STRING(255),
        allowNull: false,
        unique: true
    },
    num_lugares: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    num_motor: {
        type: DataTypes.STRING(255),
        allowNull: false,
        unique: true
    },
    num_portas: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    tipo_combustivel: {
        type: DataTypes.STRING(255),
        allowNull: false,
    },
    state: {
        type: DataTypes.ENUM('Free', 'Occupied'),
        defaultValue: 'Free',
    },
    rentalIncludesDriver: {  // Campo para indicar se o aluguel inclui motorista
        type: DataTypes.BOOLEAN,
        defaultValue: false, // Por padrão, será 'false', ou seja, não inclui motorista
    },
    isAvailable: {  // Novo campo para disponibilidade
        type: DataTypes.BOOLEAN,
        defaultValue: false, // Por padrão, disponível
    },
}, {
    timestamps: true,
});

export default Veiculo;
