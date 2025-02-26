import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';
import Veiculo from '../models/Veiculo.js';

const VeiculoImg = sequelize.define("veiculoImg", {
    veiculoId: {
        type: DataTypes.INTEGER,
        references: {
            model: Veiculo,
            key: 'id'
        },
        allowNull: false
    },
    image: {
        type: DataTypes.BLOB,
        allowNull: false
    }
}, {
    timestamps: true,
});

export default VeiculoImg;
