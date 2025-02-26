import { Sequelize, DataTypes } from 'sequelize';
import db from "../config/database.js";


const detalhesmanutencao =  db.define("detalhesmanutencao", {
tipo_manutencao:{
    type:DataTypes.STRING(255)
},
data_manutencao:{
    type:DataTypes.DATE
},
obs:{
    type:DataTypes.STRING(255)
},
manutencaoID:{
  type:DataTypes.INTEGER,
  references:{ model:'manutencaos',key:'id'},
  onDelete:'CASCADE',
  onUpdate:'CASCADE',
  allowNull:false
}
});

export default detalhesmanutencao;

