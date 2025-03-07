import express from 'express';
import {
  createPaymentCriteria,
  getAllPaymentCriteria,
  getPaymentCriteriaById,
  updatePaymentCriteria,
  deletePaymentCriteria,
} from '../controllers/PaymentCriteriaController.js';

const router = express.Router();

router.post('/', createPaymentCriteria); // Criar novo critério
router.get('/', getAllPaymentCriteria); // Listar todos os critérios
router.get('/:id', getPaymentCriteriaById); // Buscar critério por ID
router.put('/:id', updatePaymentCriteria); // Atualizar critério por ID
router.delete('/:id', deletePaymentCriteria); // Excluir critério por ID

export default router;
