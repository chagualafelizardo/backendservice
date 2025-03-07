import express from 'express';
import {
  getAllAtendimentoDocuments,
  createAtendimentoDocument,
  getAtendimentoDocumentById,
  updateAtendimentoDocument,
  deleteAtendimentoDocument
} from '../controllers/AtendimentoDocumentController.js';

const router = express.Router();

router.post('/', createAtendimentoDocument);           // Rota para adicionar um novo documento de atendimento
router.get('/', getAllAtendimentoDocuments);           // Rota para buscar todos os documentos de atendimento
router.get('/:id', getAtendimentoDocumentById);        // Rota para buscar documento de atendimento por ID
router.put('/:id', updateAtendimentoDocument);         // Rota para atualizar um documento de atendimento por ID
router.delete('/:id', deleteAtendimentoDocument);      // Rota para deletar um documento de atendimento por ID

export default router;
