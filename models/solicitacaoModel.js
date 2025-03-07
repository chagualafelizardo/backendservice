import { Sequelize, DataTypes } from 'sequelize';
import db from "../config/database.js";


const solicitacao = db.define("solicitacao", {
data_solicitacao:{
    type:DataTypes.DATE
},
destino:{
    type:DataTypes.STRING(255)
},
tipo_veiculo:{
    type:DataTypes.STRING(255)
},
num_dias:{
    type:DataTypes.INTEGER
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
clienteID:{
  type:DataTypes.INTEGER,
  references:{ model:'clientes',key:'id'},
  onDelete:'CASCADE',
  onUpdate:'CASCADE',
  allowNull:false
}
});

export default solicitacao;
