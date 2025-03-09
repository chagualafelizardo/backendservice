import { Sequelize } from 'sequelize';
import dotenv from 'dotenv/config.js';

// // Passar os dados do .env para as constantes
// const dbName = process.env.DB_NAME; 
// const dbUser = process.env.DB_USER;
// const dbHost = process.env.DB_HOST;
// const dbPassword = process.env.DB_PASSWORD;

// const sequelize = new Sequelize(dbName, dbUser, dbPassword, {
//   dialect: 'mysql', // Informar o tipo de banco que vamos utilizar
//   host: dbHost, // O host, neste caso estamos com um banco local
// });

// sequelize.authenticate().then(() => {
//   console.log('Conexão estabelecida com sucesso.');
// }).catch((error) => {
//   console.error('Não foi possível estabelecer a conexão com a base de dados: ', error);
// });

// export default sequelize;

// Passar os dados do .env para as constantes
const dbName = process.env.DB_NAME; 
const dbUser = process.env.DB_USER;
const dbHost = process.env.DB_HOST;
const dbPassword = process.env.DB_PASSWORD;
const dbDialect = process.env.DB_DIALECT || 'postgres';
const dbPort = process.env.DB_PORT || 5432;
const useSSL = process.env.DB_SSL === 'true';

const sequelize = new Sequelize(dbName, dbUser, dbPassword, {
  dialect: dbDialect,
  host: dbHost,
  port: dbPort,
  logging: false,
  dialectOptions: dbHost.includes('localhost') || dbHost === '127.0.0.1' ? {} : {
    ssl: {
      require: true,
      rejectUnauthorized: false,
    },
  },
});

sequelize.authenticate()
  .then(() => {
    console.log('✅ Conexão estabelecida com sucesso no PostgreSQL.');
  })
  .catch((error) => {
    console.error('❌ Não foi possível estabelecer a conexão com a base de dados:', error);
  });

export default sequelize;

