import express from 'express';
import {
  createPagamentoReserva,
  AllPagamentoReservas,
  getPagamentoReservaById,
  updatePagamentoReserva,
  deletePagamentoReserva,
  buscarLocalizacao,
} from '../controllers/PagamentoReservaController.js';

const router = express.Router();

router.post('/', createPagamentoReserva);
router.get('/', AllPagamentoReservas);
router.get('/:id', getPagamentoReservaById);
router.put('/:id', updatePagamentoReserva);
router.delete('/:id', deletePagamentoReserva);
router.get('/buscarlocalizacao', buscarLocalizacao);

export default router;