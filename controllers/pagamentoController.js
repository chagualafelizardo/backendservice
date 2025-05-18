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

    // Criar o pagamento com status 'pending' por padrão
    const pagamento = await Pagamento.create({
      valorTotal,
      data,
      atendimentoId,
      userId,
      criterioPagamentoId,
      status: 'pending' // Status padrão
    });

    res.status(201).json(pagamento);
  } catch (error) {
    res.status(500).json({ message: 'Erro ao criar pagamento.', error: error.message });
  }
};

// Buscar todos os pagamentos (com filtro por status opcional)
export const getAllPagamentos = async (req, res) => {
  try {
    const { status } = req.query;
    
    const whereClause = {};
    if (status) {
      whereClause.status = status;
    }

    const pagamentos = await Pagamento.findAll({
      where: whereClause,
      include: [
        { model: Atendimento, as: 'atendimento' },
        { model: User, as: 'user' },
        { model: PaymentCriteria, as: 'criterioPagamento' },
      ],
      order: [['data', 'DESC']] // Ordenar por data decrescente
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
        { model: Atendimento, as: 'atendimento' },
        { model: User, as: 'user' },
        { model: PaymentCriteria, as: 'criterioPagamento' },
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
    const { valorTotal, data, atendimentoId, userId, criterioPagamentoId, status } = req.body;

    const pagamento = await Pagamento.findByPk(id);
    if (!pagamento) {
      return res.status(404).json({ message: 'Pagamento não encontrado.' });
    }

    // Verificar se o status fornecido é válido
    if (status && !['pending', 'confirmed', 'rejected'].includes(status)) {
      return res.status(400).json({ message: 'Status de pagamento inválido.' });
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
      status: status || pagamento.status
    });

    res.status(200).json(pagamento);
  } catch (error) {
    res.status(500).json({ message: 'Erro ao atualizar pagamento.', error: error.message });
  }
};

// Endpoint específico para confirmar um pagamento
export const confirmarPagamento = async (req, res) => {
  try {
    const { id } = req.params;

    const pagamento = await Pagamento.findByPk(id);
    if (!pagamento) {
      return res.status(404).json({ message: 'Pagamento não encontrado.' });
    }

    // Verificar se o pagamento já está confirmado
    if (pagamento.status === 'confirmed') {
      return res.status(400).json({ message: 'Pagamento já está confirmado.' });
    }

    // Atualizar apenas o status para 'confirmed'
    await pagamento.update({ status: 'confirmed' });

    res.status(200).json({ 
      message: 'Pagamento confirmado com sucesso.',
      pagamento 
    });
  } catch (error) {
    res.status(500).json({ message: 'Erro ao confirmar pagamento.', error: error.message });
  }
};

// Endpoint específico para rejeitar um pagamento
export const rejeitarPagamento = async (req, res) => {
  try {
    const { id } = req.params;
    const { motivo } = req.body;

    const pagamento = await Pagamento.findByPk(id);
    if (!pagamento) {
      return res.status(404).json({ message: 'Pagamento não encontrado.' });
    }

    // Verificar se o pagamento já está rejeitado
    if (pagamento.status === 'rejected') {
      return res.status(400).json({ message: 'Pagamento já está rejeitado.' });
    }

    // Atualizar o status para 'rejected' e opcionalmente armazenar o motivo
    const updateData = { status: 'rejected' };
    if (motivo) {
      updateData.motivoRejeicao = motivo;
    }

    await pagamento.update(updateData);

    res.status(200).json({ 
      message: 'Pagamento rejeitado com sucesso.',
      pagamento 
    });
  } catch (error) {
    res.status(500).json({ message: 'Erro ao rejeitar pagamento.', error: error.message });
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

// Endpoint específico para atualizar o status de um pagamento
export const updatePagamentoStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status, motivoRejeicao } = req.body;

    // Validar os dados de entrada
    if (!status || !['pending', 'confirmed', 'rejected'].includes(status)) {
      return res.status(400).json({ 
        message: 'Status inválido. Valores permitidos: pending, confirmed, rejected' 
      });
    }

    // Se for rejeição, verificar se tem motivo
    if (status === 'rejected' && !motivoRejeicao) {
      return res.status(400).json({ 
        message: 'Motivo da rejeição é obrigatório' 
      });
    }

    const pagamento = await Pagamento.findByPk(id);
    if (!pagamento) {
      return res.status(404).json({ message: 'Pagamento não encontrado.' });
    }

    // Verificar se o status atual já é o mesmo que o solicitado
    if (pagamento.status === status) {
      return res.status(400).json({ 
        message: `O pagamento já está com status ${status}` 
      });
    }

    // Preparar dados para atualização
    const updateData = { status };
    
    // Se for rejeição, adicionar o motivo
    if (status === 'rejected') {
      updateData.motivoRejeicao = motivoRejeicao;
    } else {
      // Se mudar para pending ou confirmed, limpar o motivo se existir
      updateData.motivoRejeicao = null;
    }

    // Adicionar data de confirmação se for o caso
    if (status === 'confirmed') {
      updateData.dataConfirmacao = new Date();
    }

    // Atualizar apenas os campos necessários
    await pagamento.update(updateData);

    res.status(200).json({ 
      message: `Status do pagamento atualizado para ${status}`,
      pagamento 
    });
  } catch (error) {
    res.status(500).json({ 
      message: 'Erro ao atualizar status do pagamento.', 
      error: error.message 
    });
  }
};