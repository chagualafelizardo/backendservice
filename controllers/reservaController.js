import Reserva from '../models/Reserva.js';
import User from '../models/User.js';
import Veiculo from '../models/Veiculo.js';

// Criar uma nova reserva
export const createReserva = async (req, res) => {
  const { date, destination, number_of_days, userID, clientID, veiculoID, state, inService } = req.body;
  try {
    const newReserva = await Reserva.create({
      date,
      destination,
      number_of_days,
      userID,
      clientID,
      veiculoID,
      state,
      inService, // Novo campo incluído
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
        { model: User, as: 'user', attributes: ['firstName'] },
        { model: Veiculo, as: 'veiculo', attributes: ['matricula'] }
      ]
    });
    res.status(200).json(reservas);
  } catch (error) {
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
        { model: Veiculo, as: 'veiculo', attributes: ['matricula'] }
      ]
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
  const { date, destination, number_of_days, userID, clientID, veiculoID, state, inService } = req.body;
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
      reserva.inService = inService; // Atualiza o novo campo
      await reserva.save();

      console.log('ID:', id);

      res.status(200).json(reserva);
    } else {
      res.status(404).json({ message: 'Reserva not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Atualizar apenas o estado da reserva
export const updateReservaState = async (req, res) => {
  const { id } = req.params;
  const { state } = req.body;
  
  console.log(`Received PUT request for reserva ID: ${id} with state: ${state}`);

  try {
    const reserva = await Reserva.findByPk(id);
    
    if (reserva) {
      reserva.state = state;
      await reserva.save();

      console.log(`Reserva ID ${id} updated to state: ${state}`);
      res.status(200).json({ message: 'Reserva confirmed successfully', reserva });
    } else {
      console.log(`Reserva ID ${id} not found`);
      res.status(404).json({ message: 'Reserva not found' });
    }
  } catch (error) {
    console.error(`Error updating reserva ID ${id}: ${error.message}`);
    res.status(500).json({ message: error.message });
  }
};

// Deletar uma reserva
export const deleteReserva = async (req, res) => {
  const { id } = req.params;
  try {
    const reserva = await Reserva.findByPk(id);
    if (reserva) {
      await reserva.destroy();
      res.status(204).json();
    } else {
      res.status(404).json({ message: 'Reserva not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Obter detalhes da reserva pelo número
export const getReservaDetailsByNumber = async (req, res) => {
  const { id } = req.params;
  try {
    const reserva = await Reserva.findOne({
      where: { id: id },
      include: [
        { model: User, as: 'user', attributes: ['firstName', 'lastName', 'email'] },
        { model: Veiculo, as: 'veiculo', attributes: ['matricula', 'marca', 'modelo'] }
      ]
    });

    if (reserva) {
      res.status(200).json({
        id: reserva.id,
        destination: reserva.destination,
        date: reserva.date,
        numberOfDays: reserva.numberOfDays,
        state: reserva.state,
        inService: reserva.inService, // Exibir o novo campo
        user: {
          id: reserva.user.id,
          firstName: reserva.user.firstName,
          lastName: reserva.user.lastName,
          email: reserva.user.email,
        },
        veiculo: {
          id: reserva.veiculo.id,
          matricula: reserva.veiculo.matricula,
          marca: reserva.veiculo.marca,
          modelo: reserva.veiculo.modelo,
        }
      });
    } else {
      res.status(404).json({ message: 'Reserva not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Atualizar apenas o campo inService da reserva
export const updateReservaInService = async (req, res) => {
  const { id } = req.params;
  const { inService } = req.body;

  console.log(`Received PUT request for reserva ID: ${id} with inService: ${inService}`);

  try {
    const reserva = await Reserva.findByPk(id);

    if (reserva) {
      reserva.inService = inService;
      await reserva.save();

      console.log(`Reserva ID ${id} updated to inService: ${inService}`);
      res.status(200).json({ message: 'Reserva inService flag updated successfully', reserva });
    } else {
      console.log(`Reserva ID ${id} not found`);
      res.status(404).json({ message: 'Reserva not found' });
    }
  } catch (error) {
    console.error(`Error updating inService for reserva ID ${id}: ${error.message}`);
    res.status(500).json({ message: error.message });
  }
};
