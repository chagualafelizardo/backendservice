import express from 'express';
import {
  createPagamentoReserva,
  AllPagamentoReservas,
  getPagamentoReservaById,
  updatePagamentoReserva,
  deletePagamentoReserva,
} from '../controllers/PagamentoReservaController.js';

const router = express.Router();

router.post('/', createPagamentoReserva);
router.get('/', AllPagamentoReservas);
router.get('/:id', getPagamentoReservaById);
router.put('/:id', updatePagamentoReserva);
router.delete('/:id', deletePagamentoReserva);

export default router;