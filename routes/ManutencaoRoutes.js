import express from 'express';
import {
  findAllManutencoes,
  addManutencao,
  getManutencaoById,
  updateManutencao,
  deleteManutencao,
  addEnviaManutencao,
  findAllManutencoesComVeiculos,
} from '../controllers/manutencaoController.js';

const router = express.Router();

// Rotas para manutenções
router.get('/', findAllManutencoes); // Buscar todas as manutenções
router.post('/', addManutencao); // Adicionar uma nova manutenção
router.get('/:id', getManutencaoById); // Buscar uma manutenção por ID
router.put('/:id', updateManutencao); // Atualizar uma manutenção por ID
router.delete('/:id', deleteManutencao); // Deletar uma manutenção por ID
router.post('/enviamanutecao',addEnviaManutencao)
router.get('/veiculo',findAllManutencoesComVeiculos)

export default router;