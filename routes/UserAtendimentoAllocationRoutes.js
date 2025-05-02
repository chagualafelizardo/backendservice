import express from 'express';
import {
  createUserAtendimentoAllocation,
  getAllUserAtendimentoAllocations,
  getUserAtendimentoAllocationById,
  updateUserAtendimentoAllocation,
  deleteUserAtendimentoAllocation,
  getUsersByAtendimentoId,
  getUserDetailsByAtendimentoId,
} from '../controllers/UserAtendimentoAllocationController.js'; // Altere para o caminho correto do seu controller

const router = express.Router();

router.post('/', createUserAtendimentoAllocation);
router.get('/', getAllUserAtendimentoAllocations);
router.get('/:id', getUserAtendimentoAllocationById);
router.put('/:id', updateUserAtendimentoAllocation);
router.delete('/:id', deleteUserAtendimentoAllocation);
router.get('/atendimento/:atendimentoId', getUsersByAtendimentoId);
router.get('/user/atendimento/:atendimentoId', getUserDetailsByAtendimentoId);

export default router;
