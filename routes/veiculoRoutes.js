import express from 'express';
import {
  findAll,
  getVeiculoById,
  addVeiculo,
  updateVeiculo,
  deleteVeiculo,
  findAllWithDriver,
  findAllAvailable,
  updateIsAvailable,
  updateIsAvailableByMatricula,
  getVeiculoByMatricula,
  getVeiculoByMatriculaM,
  findVeiculosEmManutencao,
  getVeiculoWithDetails,
  findAllByState
} from '../controllers/veiculoController.js';

const router = express.Router();

router.get('/', findAll);
router.get('/isAvailable', findAllAvailable);
router.get('/:id', getVeiculoById);
router.post('/', addVeiculo);
router.put('/:id', updateVeiculo);
router.delete('/:id', deleteVeiculo);
router.get('/withdriver', findAllWithDriver);
router.patch('/:id/isAvailable', updateIsAvailable);
router.patch('/:matricula', updateIsAvailableByMatricula);
router.get('/veiculo/:matricula', getVeiculoByMatricula);
router.get('/matricula/:matricula', getVeiculoByMatriculaM);
router.get('/manutencao', findVeiculosEmManutencao);
router.get('/:id/details', getVeiculoWithDetails);
router.get('/state/:state', findAllByState);

export default router;
