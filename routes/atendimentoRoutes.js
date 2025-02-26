import express from 'express';
import {
  findAllAtendimentos,
  addAtendimento,
  getAtendimentoById,
  updateAtendimento,
  deleteAtendimento
} from '../controllers/atendimentoController.js';

const router = express.Router();

router.post('/', addAtendimento);            // Rota para adicionar um novo atendimento
router.get('/', findAllAtendimentos);        // Rota para buscar todos os atendimentos
router.get('/:id', getAtendimentoById);      // Rota para buscar atendimento por ID
router.put('/:id', updateAtendimento);       // Rota para atualizar um atendimento por ID
router.delete('/:id', deleteAtendimento);    // Rota para deletar um atendimento por ID

export default router;
