import express from 'express';
import { 
    getAllDriveDelivers, 
    createDriveDeliver, 
    getDriveDeliverById, 
    updateDriveDeliver, 
    deleteDriveDeliver 
} from '../controllers/DriverDeliverController.js';

const router = express.Router();

router.get('/', getAllDriveDelivers);
router.post('/', createDriveDeliver);
router.get('/:id', getDriveDeliverById);
router.put('/:id', updateDriveDeliver);
router.delete('/:id', deleteDriveDeliver);

export default router;
