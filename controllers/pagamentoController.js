import Pagamento from '../models/Pagamento.js';
import Atendimento from '../models/Atendimento.js';
import User from '../models/User.js';
import PaymentCriteria from '../models/PaymentCriteria.js';

// Criar um novo pagamento
export const createPagamento = async (req, res) => {
  try {
    const { valorTotal, data, atendimentoId, userId, criterioPagamentoId } = req.body;

    // Verificar se o atendimento existe
    const atendimento = await Atendimento.findByPk(atendimentoId);
    if (!atendimento) {
      return res.status(404).json({ message: 'Atendimento não encontrado.' });
    }

    // Verificar se o usuário existe
    const user = await User.findByPk(userId);
    if (!user) {
      return res.status(404).json({ message: 'Usuário não encontrado.' });
    }

    // Verificar se o critério de pagamento existe
    const criterioPagamento = await PaymentCriteria.findByPk(criterioPagamentoId);
    if (!criterioPagamento) {
      return res.status(404).json({ message: 'Critério de pagamento não encontrado.' });
    }

    // Criar o pagamento
    const pagamento = await Pagamento.create({
      valorTotal,
      data,
      atendimentoId,
      userId,
      criterioPagamentoId,
    });

    res.status(201).json(pagamento);
  } catch (error) {
    res.status(500).json({ message: 'Erro ao criar pagamento.', error: error.message });
  }
};

// Buscar todos os pagamentos
export const getAllPagamentos = async (req, res) => {
  try {
    const pagamentos = await Pagamento.findAll({
      include: [
        { model: Atendimento, as: 'atendimento' }, // Incluir detalhes do atendimento
        { model: User, as: 'user' }, // Incluir detalhes do usuário (motorista)
        { model: PaymentCriteria, as: 'criterioPagamento' }, // Incluir detalhes do critério de pagamento
      ],
    });
    res.status(200).json(pagamentos);
  } catch (error) {
    res.status(500).json({ message: 'Erro ao buscar pagamentos.', error: error.message });
  }
};

// Buscar um pagamento por ID
export const getPagamentoById = async (req, res) => {
  try {
    const { id } = req.params;

    const pagamento = await Pagamento.findByPk(id, {
      include: [
        { model: Atendimento, as: 'atendimento' }, // Incluir detalhes do atendimento
        { model: User, as: 'user' }, // Incluir detalhes do usuário (motorista)
        { model: PaymentCriteria, as: 'criterioPagamento' }, // Incluir detalhes do critério de pagamento
      ],
    });

    if (!pagamento) {
      return res.status(404).json({ message: 'Pagamento não encontrado.' });
    }

    res.status(200).json(pagamento);
  } catch (error) {
    res.status(500).json({ message: 'Erro ao buscar pagamento.', error: error.message });
  }
};

// Atualizar um pagamento
export const updatePagamento = async (req, res) => {
  try {
    const { id } = req.params;
    const { valorTotal, data, atendimentoId, userId, criterioPagamentoId } = req.body;

    const pagamento = await Pagamento.findByPk(id);
    if (!pagamento) {
      return res.status(404).json({ message: 'Pagamento não encontrado.' });
    }

    // Verificar se o atendimento existe (se fornecido)
    if (atendimentoId) {
      const atendimento = await Atendimento.findByPk(atendimentoId);
      if (!atendimento) {
        return res.status(404).json({ message: 'Atendimento não encontrado.' });
      }
    }

    // Verificar se o usuário existe (se fornecido)
    if (userId) {
      const user = await User.findByPk(userId);
      if (!user) {
        return res.status(404).json({ message: 'Usuário não encontrado.' });
      }
    }

    // Verificar se o critério de pagamento existe (se fornecido)
    if (criterioPagamentoId) {
      const criterioPagamento = await PaymentCriteria.findByPk(criterioPagamentoId);
      if (!criterioPagamento) {
        return res.status(404).json({ message: 'Critério de pagamento não encontrado.' });
      }
    }

    // Atualizar o pagamento
    await pagamento.update({
      valorTotal: valorTotal || pagamento.valorTotal,
      data: data || pagamento.data,
      atendimentoId: atendimentoId || pagamento.atendimentoId,
      userId: userId || pagamento.userId,
      criterioPagamentoId: criterioPagamentoId || pagamento.criterioPagamentoId,
    });

    res.status(200).json(pagamento);
  } catch (error) {
    res.status(500).json({ message: 'Erro ao atualizar pagamento.', error: error.message });
  }
};

// Excluir um pagamento
export const deletePagamento = async (req, res) => {
  try {
    const { id } = req.params;

    const pagamento = await Pagamento.findByPk(id);
    if (!pagamento) {
      return res.status(404).json({ message: 'Pagamento não encontrado.' });
    }

    await pagamento.destroy();
    res.status(200).json({ message: 'Pagamento excluído com sucesso.' });
  } catch (error) {
    res.status(500).json({ message: 'Erro ao excluir pagamento.', error: error.message });
  }
};