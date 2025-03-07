import DetalhePagamento from '../models/DetalhePagamento.js';
import Pagamento from '../models/Pagamento.js';

// Criar um novo detalhe de pagamento
export const createDetalhePagamento = async (req, res) => {
  try {
    const { valorPagamento, dataPagamento, pagamentoId } = req.body;

    // Verificar se o pagamento existe
    const pagamento = await Pagamento.findByPk(pagamentoId);
    if (!pagamento) {
      return res.status(404).json({ message: 'Pagamento não encontrado.' });
    }

    // Criar o detalhe de pagamento
    const detalhePagamento = await DetalhePagamento.create({
      valorPagamento,
      dataPagamento,
      pagamentoId,
    });

    res.status(201).json(detalhePagamento);
  } catch (error) {
    res.status(500).json({ message: 'Erro ao criar detalhe de pagamento.', error: error.message });
  }
};

// Buscar todos os detalhes de pagamento
export const getAllDetalhesPagamento = async (req, res) => {
  try {
    const detalhesPagamento = await DetalhePagamento.findAll({
      include: [
        { model: Pagamento, as: 'pagamento' }, // Incluir detalhes do pagamento
      ],
    });
    res.status(200).json(detalhesPagamento);
  } catch (error) {
    res.status(500).json({ message: 'Erro ao buscar detalhes de pagamento.', error: error.message });
  }
};

// Buscar um detalhe de pagamento por ID
export const getDetalhePagamentoById = async (req, res) => {
  try {
    const { id } = req.params;

    const detalhePagamento = await DetalhePagamento.findByPk(id, {
      include: [
        { model: Pagamento, as: 'pagamento' }, // Incluir detalhes do pagamento
      ],
    });

    if (!detalhePagamento) {
      return res.status(404).json({ message: 'Detalhe de pagamento não encontrado.' });
    }

    res.status(200).json(detalhePagamento);
  } catch (error) {
    res.status(500).json({ message: 'Erro ao buscar detalhe de pagamento.', error: error.message });
  }
};

// Atualizar um detalhe de pagamento
export const updateDetalhePagamento = async (req, res) => {
  try {
    const { id } = req.params;
    const { valorPagamento, dataPagamento, pagamentoId } = req.body;

    const detalhePagamento = await DetalhePagamento.findByPk(id);
    if (!detalhePagamento) {
      return res.status(404).json({ message: 'Detalhe de pagamento não encontrado.' });
    }

    // Verificar se o pagamento existe (se fornecido)
    if (pagamentoId) {
      const pagamento = await Pagamento.findByPk(pagamentoId);
      if (!pagamento) {
        return res.status(404).json({ message: 'Pagamento não encontrado.' });
      }
    }

    // Atualizar o detalhe de pagamento
    await detalhePagamento.update({
      valorPagamento: valorPagamento || detalhePagamento.valorPagamento,
      dataPagamento: dataPagamento || detalhePagamento.dataPagamento,
      pagamentoId: pagamentoId || detalhePagamento.pagamentoId,
    });

    res.status(200).json(detalhePagamento);
  } catch (error) {
    res.status(500).json({ message: 'Erro ao atualizar detalhe de pagamento.', error: error.message });
  }
};

// Excluir um detalhe de pagamento
export const deleteDetalhePagamento = async (req, res) => {
  try {
    const { id } = req.params;

    const detalhePagamento = await DetalhePagamento.findByPk(id);
    if (!detalhePagamento) {
      return res.status(404).json({ message: 'Detalhe de pagamento não encontrado.' });
    }

    await detalhePagamento.destroy();
    res.status(200).json({ message: 'Detalhe de pagamento excluído com sucesso.' });
  } catch (error) {
    res.status(500).json({ message: 'Erro ao excluir detalhe de pagamento.', error: error.message });
  }
};