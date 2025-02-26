import { Sequelize, DataTypes } from 'sequelize';
import db from "../config/database.js";


const manutencao =  db.define("manutencao", {
data_entrada:{
    type:DataTypes.DATE
},
data_saida:{
    type:DataTypes.DATE,
},
obs:{
    type:DataTypes.STRING(255)
},
veiculoID:{
  type:DataTypes.INTEGER,
  references:{ model:'veiculos',key:'id'},
  onDelete:'CASCADE',
  onUpdate:'CASCADE',
  allowNull:false
},
oficinaID:{
  type:DataTypes.INTEGER,
  references:{ model:'oficinas',key:'id'},
  onDelete:'CASCADE',
  onUpdate:'CASCADE',
  allowNull:false
}
});

export default manutencao;
