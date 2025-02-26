import DriveDeliver from '../models/DriverDeliver.js';
import Atendimento from '../models/Atendimento.js';

// Função para buscar todos os registros de DriveDeliver
export const getAllDriveDelivers = async (req, res) => {
  try {
    const driveDelivers = await DriveDeliver.findAll({
      include: Atendimento, // Inclui o modelo Atendimento nos resultados
    });
    res.json(driveDelivers);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to fetch drive deliveries' });
  }
};

// Função para criar um novo registro de DriveDeliver
export const createDriveDeliver = async (req, res) => {
  try {
    const { date, atendimentoID, deliver, pickupLatitude, pickupLongitude, dropoffLatitude, dropoffLongitude } = req.body;
    const driveDeliver = await DriveDeliver.create({
      date,
      atendimentoID,
      deliver,
      pickupLatitude,
      pickupLongitude,
      dropoffLatitude,
      dropoffLongitude,
    });
    res.status(201).json(driveDeliver);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to create drive delivery' });
  }
};

// Função para buscar um registro de DriveDeliver por ID
export const getDriveDeliverById = async (req, res) => {
  try {
    const driveDeliver = await DriveDeliver.findByPk(req.params.id, {
      include: Atendimento, // Inclui o modelo Atendimento nos resultados
    });
    if (driveDeliver) {
      res.json(driveDeliver);
    } else {
      res.status(404).json({ error: 'Drive delivery not found' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to fetch drive delivery' });
  }
};

// Função para atualizar um registro de DriveDeliver por ID
export const updateDriveDeliver = async (req, res) => {
  try {
    const { date, atendimentoID, deliver, pickupLatitude, pickupLongitude, dropoffLatitude, dropoffLongitude } = req.body;
    const driveDeliver = await DriveDeliver.findByPk(req.params.id);
    if (driveDeliver) {
      await driveDeliver.update({
        date,
        atendimentoID,
        deliver,
        pickupLatitude,
        pickupLongitude,
        dropoffLatitude,
        dropoffLongitude,
      });
      res.json(driveDeliver);
    } else {
      res.status(404).json({ error: 'Drive delivery not found' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to update drive delivery' });
  }
};

// Função para deletar um registro de DriveDeliver por ID
export const deleteDriveDeliver = async (req, res) => {
  try {
    const driveDeliver = await DriveDeliver.findByPk(req.params.id);
    if (driveDeliver) {
      await driveDeliver.destroy();
      res.json({ message: 'Drive delivery deleted' });
    } else {
      res.status(404).json({ error: 'Drive delivery not found' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to delete drive delivery' });
  }
};
