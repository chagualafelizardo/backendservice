import express from 'express';
import * as tipoMultaController from '../controllers/TipoMultaController.js';

const router = express.Router();

router.get('/', tipoMultaController.getAllTiposMulta);
router.post('/', tipoMultaController.createTipoMulta);
router.get('/:id', tipoMultaController.getTipoMultaById);
router.put('/:id', tipoMultaController.updateTipoMulta);
router.delete('/:id', tipoMultaController.deleteTipoMulta);

export default router;