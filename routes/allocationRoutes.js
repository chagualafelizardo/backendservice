import express from 'express';
import {
  getAllAllocations,
  createAllocation,
  getAllocationById,
  updateAllocation,
  deleteAllocation,
  getAllocationDetailsById,
} from '../controllers/AllocationController.js'; // Altere para o caminho correto do seu controller

const router = express.Router();

router.post('/', createAllocation);
router.get('/', getAllAllocations);
router.get('/:id', getAllocationById);
router.put('/:id', updateAllocation);
router.delete('/:id', deleteAllocation);
router.get('/allocation/:allocationId/details', getAllocationDetailsById);

export default router;
