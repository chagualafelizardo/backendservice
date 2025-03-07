import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';

const posto =  sequelize.define("posto", {
nome_posto:{
    type:DataTypes.STRING(255)
},
endereco:{
    type:DataTypes.STRING(255)
},
telefone:{
    type:DataTypes.INTEGER
},
obs:{
    type:DataTypes.STRING(255)
}
});

export default posto;
