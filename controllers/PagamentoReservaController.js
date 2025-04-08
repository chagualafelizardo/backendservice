import PagamentoReserva from '../models/PagamentoReserva.js';
import User from '../models/User.js';
import Reserva from '../models/Reserva.js';
import fetch from 'node-fetch'; // certifique-se de que esse import está no topo do arquivo

// Criar um novo pagamento de reserva
export const createPagamentoReserva = async (req, res) => {
  const { valorTotal, userId, reservaId,obs } = req.body;

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
      obs,
    });

    res.status(201).json(pagamentoReserva);
  } catch (error) {
    console.error('Erro ao criar pagamento de reserva:', error);
    res.status(500).json({ message: 'Erro ao criar pagamento de reserva.' });
  }
};

// Listar todos os pagamentos de reserva
export const AllPagamentoReservas = async (req, res) => {
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
  const { valorTotal, userId, reservaId,obs } = req.body;

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
      obs,
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

export const buscarLocalizacao = async (req, res) => {
  const { query } = req.query;

  if (!query) {
    return res.status(400).json({ message: 'Parâmetro de busca "query" é obrigatório.' });
  }

  const apiKey = process.env.GOOGLE_MAPS_API_KEY;
  const url = `https://maps.googleapis.com/maps/api/place/textsearch/json?query=${encodeURIComponent(query)}&key=${apiKey}&language=pt&region=mz`;

  try {
    const response = await fetch(url);

    // Verifica se a resposta foi bem-sucedida
    if (!response.ok) {
      return res.status(500).json({ message: 'Erro ao acessar o Google Places API.' });
    }

    const data = await response.json();

    if (data.status !== 'OK') {
      return res.status(500).json({ message: `Erro do Google Places: ${data.status}` });
    }

    res.status(200).json(data);
  } catch (error) {
    console.error('Erro ao buscar localização:', error);
    res.status(500).json({ message: 'Erro ao buscar localização no Google Places.' });
  }
};