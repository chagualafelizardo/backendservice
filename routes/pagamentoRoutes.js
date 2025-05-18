import express from 'express';
import {
  createPagamento,
  getAllPagamentos,
  getPagamentoById,
  updatePagamento,
  deletePagamento,
  updatePagamentoStatus,
} from '../controllers/pagamentoController.js';

const router = express.Router();

// Rotas para pagamentos
router.post('/', createPagamento);
router.get('/', getAllPagamentos);
router.get('/:id', getPagamentoById);
router.put('/:id', updatePagamento);
router.delete('/:id', deletePagamento);
router.patch('/status/:id', updatePagamentoStatus);

export default router;