import { Sequelize, DataTypes } from 'sequelize';
import db from "../config/database.js";

const abastecimento =  db.define("abastecimento", {
data_abastecimento:{
    type:DataTypes.DATE
},
litros:{
    type:DataTypes.STRING(255)
},
valor:{
    type:DataTypes.FLOAT
},
postoID:{
    type:DataTypes.INTEGER,
    references:{ model:'postos',key:'id'},
    onDelete:'CASCADE',
    onUpdate:'CASCADE',
    allowNull:false
},
veiculoID:{
  type:DataTypes.INTEGER,
  references:{ model:'veiculos',key:'id'},
  onDelete:'CASCADE',
  onUpdate:'CASCADE',
  allowNull:false
}
});

export default abastecimento;

