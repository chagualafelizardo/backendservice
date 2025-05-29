import express from 'express';
import {
  createExtendServiceDay,
  getAllExtendServiceDays,
  getExtendServiceDayById,
  fetchByAtendimentoId,
  updateExtendServiceDay,
  deleteExtendServiceDay
} from '../controllers/ExtendServiceDayController.js';

const router = express.Router();

router.post('/', createExtendServiceDay);
router.get('/', getAllExtendServiceDays);
router.get('/atendimento/:atendimentoId', fetchByAtendimentoId);
router.get('/:id', getExtendServiceDayById);
router.put('/:id', updateExtendServiceDay);
router.delete('/:id', deleteExtendServiceDay);

export default router;
