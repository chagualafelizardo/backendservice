import express from 'express';
import {
  createVehicleSupply,
  getAllVehicleSupplies,
  getVehicleSupplyById,
  updateVehicleSupply,
  deleteVehicleSupply,
} from '../controllers/VehicleSupplyController.js';

const router = express.Router();

router.post('/', createVehicleSupply);
router.get('/', getAllVehicleSupplies);
router.get('/:id', getVehicleSupplyById);
router.put('/:id', updateVehicleSupply);
router.delete('/:id', deleteVehicleSupply);

export default router;
