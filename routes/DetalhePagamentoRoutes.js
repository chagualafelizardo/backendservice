import express from 'express';
import {
  createDetalhePagamento,
  getAllDetalhesPagamento,
  getDetalhePagamentoById,
  updateDetalhePagamento,
  deleteDetalhePagamento,
} from '../controllers/DetalhePagamentoController.js';

const router = express.Router();

// Rotas para detalhes de pagamento
router.post('/', createDetalhePagamento);
router.get('/', getAllDetalhesPagamento);
router.get('/:id', getDetalhePagamentoById);
router.put('/:id', updateDetalhePagamento);
router.delete('/:id', deleteDetalhePagamento);

export default router;