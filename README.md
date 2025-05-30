<<<<<<< HEAD
# backendservice
=======
# Este projeto foi desenvolvido por Felizardo Chaguala no ambito do desenvolvimento de um 
# Sistema de Gestao de Frotas para a Empresa LN Car Rental 

# APi
https://www.turing.com/kb/mysql-connection-with-node-js-using-sequelize-and-express

https://www.treinaweb.com.br/blog/usando-sequelize-orm-com-node-e-express

# Sobre sequelize
https://sequelize.org/docs/v6/core-concepts/model-instances/

# Ver videos sobre sequelize
https://www.youtube.com/watch?v=7udHlHLHUDw
https://www.youtube.com/watch?v=TavTaLemiQo
https://www.youtube.com/watch?v=LAK1XptdZX8&t=118s

# Como criar uma API completa com NodeJS e Express | Backend - Projeto Full
https://www.youtube.com/watch?v=Cdu0WJhI-d8&t=2134s

# Get checkbox in html using node.js
https://www.youtube.com/watch?v=TjpL8U_vxOo

# Exemplos para implementacao de padroes de criacao
https://itnext.io/implement-prototype-pattern-in-javascript-9cf57092912e
https://medium.com/@devbhanupratap/creational-design-patterns-in-nodejs-4021355e77e0
https://blog.logrocket.com/guide-node-js-design-patterns/#prototype-pattern

# Ao correr o projeto usando o nodemon app.js
No ficheiro package.json, na propriedade type colocar "commonjs" para executar o projeto na cloud e module para executar o projeto no maquina local
 
# Bom video para iniciantes em node.js
https://www.youtube.com/watch?v=LAUi8pPlcUM&list=PLC3y8-rFHvwh8shCMHFA5kWxD9PaPwxaY
https://www.youtube.com/watch?v=pP4kjXykbio
https://www.youtube.com/watch?v=JZXQ455OT3A&list=PL0Zuz27SZ-6PFkIxaJ6Xx_X46avTM1aYw
>>>>>>> 3324002 (Initial commit)

<!-- Acesse o link fornecido no erro: -->
https://github.com/chagualafelizardo/backendservice/security/secret-scanning/unblock-secret/2xHeoVexQNUGyJdCmsgzmk3suJp

git add .
git commit -m "Initial commit"
git push -u origin main


git add .
git commit -m "Remove sensitive data from history"
git push origin main --force

Para logs mais organizados, instale o pacote winston (um logger avançado):
npm install winston

import winston from 'winston';

const logger = winston.createLogger({
  level: 'info',
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.json()
  ),
  transports: [
    new winston.transports.Console(),
    new winston.transports.File({ filename: 'logs/error.log', level: 'error' }),
    new winston.transports.File({ filename: 'logs/combined.log' })
  ]
});

// Substitua os console.log por:
logger.info('Mensagem informativa');
logger.error('Mensagem de erro');