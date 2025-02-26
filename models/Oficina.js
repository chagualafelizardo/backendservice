import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';

const oficina =  sequelize.define("oficina", {
nome_oficina:{
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

export default oficina;
