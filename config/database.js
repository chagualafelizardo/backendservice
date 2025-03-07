import { Sequelize } from 'sequelize';
import dotenv from 'dotenv/config.js';

// Passar os dados do .env para as constantes
const dbName = process.env.DB_NAME; 
const dbUser = process.env.DB_USER;
const dbHost = process.env.DB_HOST;
const dbPassword = process.env.DB_PASSWORD;

const sequelize = new Sequelize(dbName, dbUser, dbPassword, {
  dialect: 'mysql', // Informar o tipo de banco que vamos utilizar
  host: dbHost, // O host, neste caso estamos com um banco local
});

sequelize.authenticate().then(() => {
  console.log('Conexão estabelecida com sucesso.');
}).catch((error) => {
  console.error('Não foi possível estabelecer a conexão com a base de dados: ', error);
});

export default sequelize;
