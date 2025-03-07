import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';

const Item =  sequelize.define("item", {
item:{
    type:DataTypes.STRING(255)
},
obs:{
    type:DataTypes.STRING(255)
}
});

export default Item;
