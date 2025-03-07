import express from 'express';
import {
  findAllDetalhesManutencao,
  addDetalheManutencao,
  getDetalheManutencaoById,
  updateDetalheManutencao,
  deleteDetalheManutencao,
} from '../controllers/detalhesmanutencaoController.js';

const router = express.Router();

// Rotas para detalhes de manutenção
router.get('/', findAllDetalhesManutencao); // Buscar todos os detalhes
router.post('/', addDetalheManutencao); // Adicionar um novo detalhe
router.get('/:id', getDetalheManutencaoById); // Buscar um detalhe por ID
router.put('/:id', updateDetalheManutencao); // Atualizar um detalhe por ID
router.delete('/:id', deleteDetalheManutencao); // Deletar um detalhe por ID

export default router;