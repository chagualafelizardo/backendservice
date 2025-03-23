import express from 'express';
import {
  getAllVeiculoDetails,
  getVeiculoDetailsById,
  createVeiculoDetails,
  updateVeiculoDetails,
  deleteVeiculoDetails,
} from '../controllers/VeiculoDetailsController.js';

const router = express.Router();

router.get('/', getAllVeiculoDetails);
router.get('/:id', getVeiculoDetailsById);
router.post('/', createVeiculoDetails);
router.put('/:id', updateVeiculoDetails);
router.delete('/:id', deleteVeiculoDetails);

export default router;