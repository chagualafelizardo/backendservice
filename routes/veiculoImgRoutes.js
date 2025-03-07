import express from 'express';
import {
  findAllImagesByVeiculoId,
  addImageToVeiculo,
  deleteImageById
} from '../controllers/VeiculoImgController.js';

const router = express.Router();

router.get('/:veiculoId/images', findAllImagesByVeiculoId);
router.post('/:veiculoId/image', addImageToVeiculo);
router.delete('/image/:id', deleteImageById);

export default router;
