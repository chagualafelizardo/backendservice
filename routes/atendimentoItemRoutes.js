import express from 'express';
import {
  getAllAtendimentoItems,
  createAtendimentoItem,
  getAtendimentoItemById,
  updateAtendimentoItem,
  deleteAtendimentoItem
} from '../controllers/AtendimentoItemController.js';

const router = express.Router();

router.post('/', createAtendimentoItem);           // Rota para adicionar um novo item de atendimento
router.get('/', getAllAtendimentoItems);           // Rota para buscar todos os itens de atendimento
router.get('/:id', getAtendimentoItemById);        // Rota para buscar item de atendimento por ID
router.put('/:id', updateAtendimentoItem);         // Rota para atualizar um item de atendimento por ID
router.delete('/:id', deleteAtendimentoItem);      // Rota para deletar um item de atendimento por ID

export default router;
