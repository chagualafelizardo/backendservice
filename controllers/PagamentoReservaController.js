import PagamentoReserva from '../models/PagamentoReserva.js';
import User from '../models/User.js';
import Reserva from '../models/Reserva.js';

// Criar um novo pagamento de reserva
export const createPagamentoReserva = async (req, res) => {
  const { valorTotal, userId, reservaId } = req.body;

  try {
    // Verificar se o usuário e a reserva existem
    const user = await User.findByPk(userId);
    const reserva = await Reserva.findByPk(reservaId);

    if (!user || !reserva) {
      return res.status(404).json({ message: 'Usuário ou reserva não encontrados.' });
    }

    // Criar o pagamento
    const pagamentoReserva = await PagamentoReserva.create({
      valorTotal,
      userId,
      reservaId,
    });

    res.status(201).json(pagamentoReserva);
  } catch (error) {
    console.error('Erro ao criar pagamento de reserva:', error);
    res.status(500).json({ message: 'Erro ao criar pagamento de reserva.' });
  }
};

// Listar todos os pagamentos de reserva
export const listPagamentoReservas = async (req, res) => {
  try {
    const pagamentoReservas = await PagamentoReserva.findAll({
      include: [
        { model: User, attributes: ['id', 'firstName', 'lastName'] }, // Incluir dados do usuário
        { model: Reserva, attributes: ['id', 'date', 'destination'] }, // Incluir dados da reserva
      ],
    });

    res.status(200).json(pagamentoReservas);
  } catch (error) {
    console.error('Erro ao listar pagamentos de reserva:', error);
    res.status(500).json({ message: 'Erro ao listar pagamentos de reserva.' });
  }
};

// Obter um pagamento de reserva por ID
export const getPagamentoReservaById = async (req, res) => {
  const { id } = req.params;

  try {
    const pagamentoReserva = await PagamentoReserva.findByPk(id, {
      include: [
        { model: User, attributes: ['id', 'firstName', 'lastName'] }, // Incluir dados do usuário
        { model: Reserva, attributes: ['id', 'date', 'destination'] }, // Incluir dados da reserva
      ],
    });

    if (!pagamentoReserva) {
      return res.status(404).json({ message: 'Pagamento de reserva não encontrado.' });
    }

    res.status(200).json(pagamentoReserva);
  } catch (error) {
    console.error('Erro ao buscar pagamento de reserva:', error);
    res.status(500).json({ message: 'Erro ao buscar pagamento de reserva.' });
  }
};

// Atualizar um pagamento de reserva
export const updatePagamentoReserva = async (req, res) => {
  const { id } = req.params;
  const { valorTotal, userId, reservaId } = req.body;

  try {
    const pagamentoReserva = await PagamentoReserva.findByPk(id);

    if (!pagamentoReserva) {
      return res.status(404).json({ message: 'Pagamento de reserva não encontrado.' });
    }

    // Verificar se o usuário e a reserva existem
    const user = await User.findByPk(userId);
    const reserva = await Reserva.findByPk(reservaId);

    if (!user || !reserva) {
      return res.status(404).json({ message: 'Usuário ou reserva não encontrados.' });
    }

    // Atualizar o pagamento
    await pagamentoReserva.update({
      valorTotal,
      userId,
      reservaId,
    });

    res.status(200).json(pagamentoReserva);
  } catch (error) {
    console.error('Erro ao atualizar pagamento de reserva:', error);
    res.status(500).json({ message: 'Erro ao atualizar pagamento de reserva.' });
  }
};

// Excluir um pagamento de reserva
export const deletePagamentoReserva = async (req, res) => {
  const { id } = req.params;

  try {
    const pagamentoReserva = await PagamentoReserva.findByPk(id);

    if (!pagamentoReserva) {
      return res.status(404).json({ message: 'Pagamento de reserva não encontrado.' });
    }

    await pagamentoReserva.destroy();
    res.status(204).json({ message: 'Pagamento de reserva excluído com sucesso.' });
  } catch (error) {
    console.error('Erro ao excluir pagamento de reserva:', error);
    res.status(500).json({ message: 'Erro ao excluir pagamento de reserva.' });
  }
};