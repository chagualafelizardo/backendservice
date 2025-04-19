import express from 'express';
import { 
    getAllVehicleHistoryRents, 
    createVehicleHistoryRent, 
    getVehicleHistoryRentById, 
    updateVehicleHistoryRent, 
    deleteVehicleHistoryRent,
    getVehicleHistoryRentsByVeiculoId,
    getLatestVehicleRentValue
} from '../controllers/VehicleHistoryRentController.js';

const router = express.Router();

router.get('/', getAllVehicleHistoryRents);
router.post('/', createVehicleHistoryRent);
router.get('/:id', getVehicleHistoryRentById);
router.put('/:id', updateVehicleHistoryRent);
router.delete('/:id', deleteVehicleHistoryRent);
router.get('/byvehicle/:veiculoId', getVehicleHistoryRentsByVeiculoId);
router.get('/last/:veiculoId', getVehicleHistoryRentsByVeiculoId);

export default router;
