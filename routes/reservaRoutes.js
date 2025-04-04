import express from 'express';
import {
  createReserva,
  getReservas,
  getReservaById,
  updateReserva,
  updateReservaState,
  deleteReserva,
  getReservaDetailsByNumber, // Importar a nova função
} from '../controllers/reservaController.js';

const router = express.Router();

router.post('/', createReserva);
router.get('/', getReservas);
router.get('/:id', getReservaById);
router.put('/reserva/:id', updateReserva);
router.put('/state/:id', updateReservaState);
router.delete('/:id', deleteReserva);
router.get('/details/:id', getReservaDetailsByNumber); // Nova rota para obter detalhes da reserva

export default router;
