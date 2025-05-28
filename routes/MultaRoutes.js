import express from 'express';
import {
  getAllMultas,
  createMulta,
  getMultaById,
  updateMulta,
  deleteMulta
} from '../controllers/multaController.js';

const router = express.Router();

// Rotas CRUD para Multas
router.route('/')
  .get(getAllMultas)    // GET /api/multas
  .post(createMulta);   // POST /api/multas

router.route('/:id')
  .get(getMultaById)    // GET /api/multas/:id
  .put(updateMulta)     // PUT /api/multas/:id
  .delete(deleteMulta); // DELETE /api/multas/:id

export default router;