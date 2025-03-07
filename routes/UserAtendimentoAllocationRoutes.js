import express from 'express';
import {
  createUserAtendimentoAllocation,
  getAllUserAtendimentoAllocations,
  getUserAtendimentoAllocationById,
  updateUserAtendimentoAllocation,
  deleteUserAtendimentoAllocation,
  getUsersByAtendimentoId,
  getUserIdByAtendimentoId,
} from '../controllers/UserAtendimentoAllocationController.js'; // Altere para o caminho correto do seu controller

const router = express.Router();

router.post('/', createUserAtendimentoAllocation);
router.get('/', getAllUserAtendimentoAllocations);
router.get('/:id', getUserAtendimentoAllocationById);
router.put('/:id', updateUserAtendimentoAllocation);
router.delete('/:id', deleteUserAtendimentoAllocation);
router.get('/atendimento/:atendimentoId', getUsersByAtendimentoId);
router.get('/user/atendimento/:atendimentoId', getUserIdByAtendimentoId);

export default router;
