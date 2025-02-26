import { Sequelize, DataTypes } from 'sequelize';
import db from "../config/database.js";


const multa =  db.define("multa", {
data_multa:{
    type:DataTypes.DATE
},
descricao:{
    type:DataTypes.STRING(255)
},
valor:{
    type:DataTypes.FLOAT
},
obs:{
    type:DataTypes.STRING(255)
},
userID:{
    type:DataTypes.INTEGER,
    references:{ model:'usuarios',key:'id'},
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

export default multa;
