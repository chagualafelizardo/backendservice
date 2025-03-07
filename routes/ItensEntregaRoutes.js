import express from 'express';
import {
    getAllItensEntrega,
    createItensEntrega,
    getItensEntregaById,
    updateItensEntrega,
    deleteItensEntrega,
} from '../controllers/ItensEntregaController.js'; // Altere para o caminho correto do seu controller

const router = express.Router();

router.post('/', createItensEntrega);
router.get('/', getAllItensEntrega);
router.get('/:id', getItensEntregaById);
router.put('/:id', updateItensEntrega);
router.delete('/:id', deleteItensEntrega);

export default router;
