import express from 'express';
import {
  createPosto,
  getPostos,
  getPostoById,
  updatePosto,
  deletePosto
} from '../controllers/postoController.js';

const router = express.Router();

router.post('/', createPosto);
router.get('/', getPostos);
router.get('/:id', getPostoById);
router.put('/:id', updatePosto);
router.delete('/:id', deletePosto);

export default router;
