import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';

const ItensEntrega =  sequelize.define("ItensEntrega", {
item:{
    type:DataTypes.STRING(255)
},
obs:{
    type:DataTypes.STRING(255)
}
});

export default ItensEntrega;
