import express from 'express';
import {
  createPagamentoReserva,
  listPagamentoReservas,
  getPagamentoReservaById,
  updatePagamentoReserva,
  deletePagamentoReserva,
} from '../controllers/PagamentoReservaController.js';

const router = express.Router();

router.post('/', createPagamentoReserva);
router.get('/', listPagamentoReservas);
router.get('/:id', getPagamentoReservaById);
router.put('/:id', updatePagamentoReserva);
router.delete('/:id', deletePagamentoReserva);

export default router;