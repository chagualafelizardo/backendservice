import express from 'express';
import { 
    getAllBankDetails, 
    createBankDetails, 
    getBankDetailsById, 
    updateBankDetails, 
    deleteBankDetails,
    getBankDetailsByUser,
} from '../controllers/bankDetailsController.js';

const router = express.Router();

router.get('/', getAllBankDetails);
router.post('/', createBankDetails);
router.get('/:id', getBankDetailsById);
router.put('/:id', updateBankDetails);
router.delete('/:id', deleteBankDetails);
router.get('/user/:userID', getBankDetailsByUser);

export default router;
