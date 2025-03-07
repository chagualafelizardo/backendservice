import express from 'express';
import {
  createPagamento,
  getAllPagamentos,
  getPagamentoById,
  updatePagamento,
  deletePagamento,
} from '../controllers/pagamentoController.js';

const router = express.Router();

// Rotas para pagamentos
router.post('/', createPagamento);
router.get('/', getAllPagamentos);
router.get('/:id', getPagamentoById);
router.put('/:id', updatePagamento);
router.delete('/:id', deletePagamento);

export default router;