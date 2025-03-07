import Reserva from '../models/Reserva.js';
import User from '../models/User.js';
import Veiculo from '../models/Veiculo.js';

// Criar uma nova reserva
export const createReserva = async (req, res) => {
  const {
    date,
    destination,
    number_of_days,
    userID,
    clientID,
    veiculoID,
    state,
    pickupLatitude,
    pickupLongitude,
    dropoffLatitude,
    dropoffLongitude,
  } = req.body;

  try {
    const newReserva = await Reserva.create({
      date,
      destination,
      number_of_days,
      userID,
      clientID,
      veiculoID,
      state,
      pickupLatitude,
      pickupLongitude,
      dropoffLatitude,
      dropoffLongitude,
    });

    res.status(201).json(newReserva);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Obter todas as reservas
export const getReservas = async (req, res) => {
  try {
    const reservas = await Reserva.findAll({
      include: [
        { model: User, as: 'user', attributes: ['id', 'firstName'] },
        { model: Veiculo, as: 'veiculo', attributes: ['id', 'matricula'] },
      ],
    });

    // Garantir que cada reserva tem 'user' e 'veiculo' antes de enviar a resposta
    const reservasComDadosCompletos = reservas.map(reserva => ({
      ...reserva.toJSON(),
      user: reserva.user || { id: null, firstName: 'Unknown' },
      veiculo: reserva.veiculo || { id: null, matricula: 'Unknown' },
    }));

    res.status(200).json(reservasComDadosCompletos);
  } catch (error) {
    console.error('Error fetching reservas:', error);
    res.status(500).json({ message: error.message });
  }
};

// Obter uma reserva pelo ID
export const getReservaById = async (req, res) => {
  const { id } = req.params;

  try {
    const reserva = await Reserva.findByPk(id, {
      include: [
        { model: User, as: 'user', attributes: ['firstName'] },
        { model: Veiculo, as: 'veiculo', attributes: ['matricula'] },
      ],
    });

    if (reserva) {
      res.status(200).json(reserva);
    } else {
      res.status(404).json({ message: 'Reserva not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Atualizar uma reserva pelo ID
export const updateReserva = async (req, res) => {
  const { id } = req.params;
  const {
    date,
    destination,
    number_of_days,
    userID,
    clientID,
    veiculoID,
    state,
    pickupLatitude,
    pickupLongitude,
    dropoffLatitude,
    dropoffLongitude,
  } = req.body;

  try {
    const reserva = await Reserva.findByPk(id);

    if (reserva) {
      reserva.date = date;
      reserva.destination = destination;
      reserva.number_of_days = number_of_days;
      reserva.userID = userID;
      reserva.clientID = clientID;
      reserva.veiculoID = veiculoID;
      reserva.state = state;
      reserva.pickupLatitude = pickupLatitude;
      reserva.pickupLongitude = pickupLongitude;
      reserva.dropoffLatitude = dropoffLatitude;
      reserva.dropoffLongitude = dropoffLongitude;

      await reserva.save();

      res.status(200).json(reserva);
    } else {
      res.status(404).json({ message: 'Reserva not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Atualizar o estado de uma reserva
export const updateReservaState = async (req, res) => {
  const { id } = req.params;
  const { state } = req.body;

  try {
    const reserva = await Reserva.findByPk(id);

    if (reserva) {
      reserva.state = state;
      await reserva.save();

      res.status(200).json({ message: 'Reserva state updated successfully', reserva });
    } else {
      res.status(404).json({ message: 'Reserva not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Deletar uma reserva pelo ID
export const deleteReserva = async (req, res) => {
  const { id } = req.params;

  try {
    const reserva = await Reserva.findByPk(id);

    if (reserva) {
      await reserva.destroy();
      res.status(204).send();
    } else {
      res.status(404).json({ message: 'Reserva not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Obter detalhes de uma reserva por ID
export const getReservaDetailsByNumber = async (req, res) => {
  const { id } = req.params;

  try {
    const reserva = await Reserva.findOne({
      where: { id },
      include: [
        { model: User, as: 'user', attributes: ['firstName'] },
        { model: Veiculo, as: 'veiculo', attributes: ['matricula'] },
      ],
    });

    if (reserva) {
      res.status(200).json({
        userName: reserva.user.firstName,
        veiculoMatricula: reserva.veiculo.matricula,
        pickupLatitude: reserva.pickupLatitude,
        pickupLongitude: reserva.pickupLongitude,
        dropoffLatitude: reserva.dropoffLatitude,
        dropoffLongitude: reserva.dropoffLongitude,
      });
    } else {
      res.status(404).json({ message: 'Reserva not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
