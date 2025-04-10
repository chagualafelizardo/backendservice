import express from 'express';
import emailRoutes from './routes/emailRoutes.js';
import smsRoutes from './routes/smsRoutes.js';

import sequelize from './config/database.js';
import cors from 'cors';
import bodyParser from 'body-parser';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';

// Importar modelos
import User from './models/User.js';
import Role from './models/Role.js';
import UserRole from './models/UserRole.js';
import Veiculo from './models/Veiculo.js';
import Oficina from './models/Oficina.js';
import Posto from './models/Posto.js';
import Reserva from './models/Reserva.js';
import ItensEntrega from './models/ItensEntrega.js';
import Allocation from './models/Allocation.js';
import VeiculoImg from './models/VeiculoImg.js';
import BankDetails from './models/BankDetails.js';
import DriveDeliver from './models/DriverDeliver.js';
import PaymentCriteria  from './models/PaymentCriteria.js';
import Atendimento from './models/Atendimento.js';
import UserAtendimentoAllocation from './models/UserAtendimentoAllocation.js';
import VehicleSupply from './models/VehicleSupply.js';
import manutencao from './models/Manutencao.js';
import detalhesmanutencao from './models/DetalhesManutencao.js';
import Pagamento from './models/Pagamento.js';
import DetalhePagamento from './models/DetalhePagamento.js';
import VeiculoDetails from './models/VeiculoDetails.js';
import PagamentoReserva from './models/PagamentoReserva.js'

// Importar rotas
import roleRoutes from './routes/roleRoutes.js';
import userRoutes from './routes/userRoutes.js';
import userRoleRoutes from './routes/userRoleRoutes.js';
import veiculoRoutes from './routes/veiculoRoutes.js';
import oficinaRoutes from './routes/oficinaRoutes.js';
import postoRoutes from './routes/postoRoutes.js';
import reservaRoutes from './routes/reservaRoutes.js';
import atendimentoRoutes from './routes/atendimentoRoutes.js';
import itemRoutes from './routes/itemRoleRoutes.js';
import atendimentoItemRoutes from './routes/atendimentoItemRoutes.js';
import atendimentoDocumentRoutes from './routes/atendimentoDocumentRoutes.js';
import ItensEntregaRoutes from './routes/ItensEntregaRoutes.js';
import AllocationRoutes from './routes/allocationRoutes.js';
import VeiculoImgRoutes from './routes/veiculoImgRoutes.js';
import UserBackDetailsRoutes from './routes/BankDetailsRoutes.js';
import DriveDeliverRoutes from './routes/DriveDeliverRoutes.js';
import PaymentCriteriaRoutes from './routes/paymentCriteriaRoutes.js';
import UserAtendimentoAllocationRoutes from './routes/UserAtendimentoAllocationRoutes.js'; // Caminho correto para o arquivo de rotas
import VehicleSupplyRoutes from './routes/VehicleSupplyRoutes.js';
import ManutencaoRoutes from './routes/ManutencaoRoutes.js';
import detalhesmanutencaoRoutes from './routes/DetalhesManutencaoRoutes.js';
import pagamentoRoutes from './routes/pagamentoRoutes.js';
import DetalhePagamentoRoutes from './routes/DetalhePagamentoRoutes.js';
import VeiculoDetailsRoutes from './routes/VeiculoDetailsRoutes.js';
import PagamentoReservaRoutes from './routes/PagamentoReservaRoutes.js'


const app = express();
const PORT = process.env.PORT || 5000;
dotenv.config(); // <- Carrega as variáveis de ambiente do arquivo .env

app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));

// Habilitar CORS para todas as rotas
app.use(cors());

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*'); // Permitir todas as origens
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  next();
});

app.options('*', cors());

app.use(express.json());

app.use(bodyParser.json());
app.use('/role', roleRoutes);
app.use('/user', userRoutes);
app.use('/userrole', userRoleRoutes);
app.use('/veiculo', veiculoRoutes);
app.use('/oficina', oficinaRoutes);
app.use('/posto', postoRoutes);
app.use('/reserva', reservaRoutes);
app.use('/atendimento', atendimentoRoutes);
app.use('/item', itemRoutes);
app.use('/atendimentoItem', atendimentoItemRoutes);
app.use('/atendimentoDocument', atendimentoDocumentRoutes);
app.use('/itensentrega', ItensEntregaRoutes);
app.use('/allocation', AllocationRoutes);
app.use('/veiculoimg', VeiculoImgRoutes);
app.use('/userbankdetails', UserBackDetailsRoutes);
app.use('/driverdeliver', DriveDeliverRoutes);
app.use('/paymentcriteria', PaymentCriteriaRoutes);
app.use('/useratendimentoallocation', UserAtendimentoAllocationRoutes);
app.use('/vehiclesupply',VehicleSupplyRoutes);
app.use('/manutencao', ManutencaoRoutes);
app.use('/detalhesmanutencao', detalhesmanutencaoRoutes);
app.use('/pagamento', pagamentoRoutes);
app.use('/detalhespagamento', DetalhePagamentoRoutes);
app.use('/veiculodetails', VeiculoDetailsRoutes);
app.use('/pagamentoreserva', PagamentoReservaRoutes)
app.use('/email', emailRoutes);
app.use('/sms', smsRoutes);

/*
  Criando associacoes no meu modelo de base de dados
*/

// Configurar associações entre modelos
User.belongsToMany(Role, { through: UserRole, foreignKey: 'userId' });
Role.belongsToMany(User, { through: UserRole, foreignKey: 'roleId' });

// Associações adicionais para UserRole
UserRole.belongsTo(User, { foreignKey: 'userId' });
UserRole.belongsTo(Role, { foreignKey: 'roleId' });

// Configurar associações entre modelos Reserva e User
Reserva.belongsTo(User, { as: 'user', foreignKey: 'userID' });
Reserva.belongsTo(Veiculo, { as: 'veiculo', foreignKey: 'veiculoID' });

// Configurar as associações entre o veiculo e veiculoImgs
Veiculo.hasMany(VeiculoImg, {foreignKey: 'veiculoId',as: 'images'});

VeiculoImg.belongsTo(Veiculo, {foreignKey: 'veiculoId',as: 'veiculo'});

// Configurar as associações entre o user e bankdetails
User.hasMany(BankDetails, { foreignKey: 'userId' });
BankDetails.belongsTo(User, { foreignKey: 'userId' });

// Configurar as associações entre o atendimento e maps de driverdeliver
// Atendimento.hasMany(DriveDeliver, { foreignKey: 'atendimentoId' });
// DriveDeliver.belongsTo(Atendimento, { foreignKey: 'atendimentoId' });

// Configurar as associações entre o atendimento e maps de driverdeliver
Reserva.hasMany(DriveDeliver, { foreignKey: 'reservaId' });
DriveDeliver.belongsTo(Reserva, { foreignKey: 'reservaId' });

// ** Definir as associações entre os modelos User, Atendimento e Alocacao **
User.belongsToMany(Atendimento, { through: UserAtendimentoAllocation, foreignKey: 'userId' });
Atendimento.belongsToMany(User, { through: UserAtendimentoAllocation, foreignKey: 'atendimentoId' });

User.belongsToMany(Allocation, { through: UserAtendimentoAllocation, foreignKey: 'userId' });
Allocation.belongsToMany(User, { through: UserAtendimentoAllocation, foreignKey: 'allocationId' });

/* Outros relacionamentos*/
Atendimento.belongsToMany(Allocation, { through: UserAtendimentoAllocation, foreignKey: 'atendimentoId' });
Allocation.belongsToMany(Atendimento, { through: UserAtendimentoAllocation, foreignKey: 'allocationId' });

User.belongsToMany(Atendimento, {through: UserAtendimentoAllocation,foreignKey: 'userId' });
User.belongsToMany(Allocation, {through: UserAtendimentoAllocation,foreignKey: 'userId' });

Atendimento.belongsToMany(User, {through: UserAtendimentoAllocation, foreignKey: 'atendimentoId' });
Atendimento.belongsToMany(Allocation, {through: UserAtendimentoAllocation, foreignKey: 'atendimentoId' });

Allocation.belongsToMany(User, {through: UserAtendimentoAllocation, foreignKey: 'allocationId',});
Allocation.belongsToMany(Atendimento, {through: UserAtendimentoAllocation, foreignKey: 'allocationId',});

// Definir a associação com o modelo Atendimento
Atendimento.hasMany(Pagamento, { foreignKey: 'atendimentoId' }); // Um atendimento pode ter muitos pagamentos

// Definir a associação com o modelo User (Motorista)
User.hasMany(Pagamento, { foreignKey: 'userId' }); // Um usuário pode ter muitos pagamentos

// Definir a associação com o modelo Pagamento
Pagamento.hasMany(DetalhePagamento, { foreignKey: 'pagamentoId' }); // Um pagamento pode ter muitos detalhes
DetalhePagamento.belongsTo(Pagamento, { foreignKey: 'pagamentoId' }); // Um detalhe pertence a um pagamento


Pagamento.belongsTo(Atendimento, { foreignKey: 'atendimentoId', as: 'atendimento' });
Pagamento.belongsTo(User, { foreignKey: 'userId', as: 'user' });
Pagamento.belongsTo(PaymentCriteria, { foreignKey: 'criterioPagamentoId', as: 'criterioPagamento' });
PaymentCriteria.hasMany(Pagamento, { foreignKey: 'criterioPagamentoId', as: 'pagamentos' });

// Defina os relacionamentos UserAtendimentoAllocation
User.belongsToMany(Atendimento, {through: UserAtendimentoAllocation, foreignKey: 'userId',});
User.belongsToMany(Allocation, {through: UserAtendimentoAllocation,foreignKey: 'userId',});
Atendimento.belongsToMany(User, {through: UserAtendimentoAllocation,foreignKey: 'atendimentoId',});
Atendimento.belongsToMany(Allocation, {through: UserAtendimentoAllocation,foreignKey: 'atendimentoId',});
Allocation.belongsToMany(User, {through: UserAtendimentoAllocation,foreignKey: 'allocationId',});
Allocation.belongsToMany(Atendimento, {through: UserAtendimentoAllocation,foreignKey: 'allocationId',});

// Relacionamento entre Veiculo e VeiculoDetails
Veiculo.hasMany(VeiculoDetails, {foreignKey: 'veiculoId',onDelete: 'CASCADE', as: 'details',});
VeiculoDetails.belongsTo(Veiculo, {foreignKey: 'veiculoId',});

// Relacionamentos
PagamentoReserva.belongsTo(User, { foreignKey: 'userId' }); // Um pagamento pertence a um usuário
PagamentoReserva.belongsTo(Reserva, { foreignKey: 'reservaId' }); // Um pagamento pertence a um atendimento


app.use(express.static(path.join(__dirname, 'pages')));

app.get("/", function(req, res){
  res.sendFile(path.join(__dirname, 'pages', 'index.html'));
});

app.listen(PORT, async () => {
  try {
    await sequelize.authenticate();
    console.log('Connection successfully established.');

    await sequelize.sync({ alter: false }); // Altere para true se necessário em desenvolvimento
    console.log('All tables have been successfully synchronized.');
  } catch (error) {
    console.error('Could not connect to the database:', error);
  }
  console.log(`Server is running on port ${PORT}`);
});
