import Reserva from '../models/Reserva.js';
import User from '../models/User.js';
import Veiculo from '../models/Veiculo.js';

// Criar uma nova reserva
export const createReserva = async (req, res) => {
  const { date, destination, number_of_days, userID, clientID, veiculoID, state } = req.body;
  try {
    const newReserva = await Reserva.create({
      date,
      destination,
      number_of_days,
      userID,
      clientID,
      veiculoID,
      state,
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
  const { date, destination, number_of_days, userID, clientID, veiculoID, state } = req.body;
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


// Função de atualização da reserva
export const updateReservaState = async (req, res) => {
  const { id } = req.params;
  const { state } = req.body;  // Somente atualizando o estado
  
  console.log(`Received PUT request for reserva ID: ${id} with state: ${state}`);

  try {
    const reserva = await Reserva.findByPk(id);
    
    if (reserva) {
      // Atualiza apenas o campo de estado
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

// Deletar uma reserva pelo ID
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
}

// Obter detalhes da reserva pelo número da reserva
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
