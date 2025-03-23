import Allocation from '../models/Allocation.js';

// Função para buscar todas as alocações
export const getAllAllocations = async (req, res) => {
  try {
    const allocations = await Allocation.findAll();
    res.json(allocations);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to fetch allocations' });
  }
};

// Função para buscar uma alocação por ID
export const getAllocationById = async (req, res) => {
  try {
    const allocation = await Allocation.findByPk(req.params.id);
    if (allocation) {
      res.json(allocation);
    } else {
      res.status(404).json({ error: 'Allocation not found' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to fetch allocation' });
  }
};

// Função para criar uma nova alocação
export const createAllocation = async (req, res) => {
  try {
    const {startDate, endDate, destination, paid } = req.body;

    const allocation = await Allocation.create({
      startDate,
      endDate,
      destination,
      paid,
    });

    res.status(201).json(allocation);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to create allocation' });
  }
};

// Função para atualizar uma alocação por ID
export const updateAllocation = async (req, res) => {
  try {
    const allocation = await Allocation.findByPk(req.params.id);
    if (allocation) {
      const {startDate, endDate, destination, paid } = req.body;

      await allocation.update({
        startDate,
        endDate,
        destination,
        paid,
      });

      res.json(allocation);
    } else {
      res.status(404).json({ error: 'Allocation not found' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to update allocation' });
  }
};

// Função para deletar uma alocação por ID
export const deleteAllocation = async (req, res) => {
  try {
    const allocation = await Allocation.findByPk(req.params.id);
    if (allocation) {
      await allocation.destroy();
      res.json({ message: 'Allocation deleted' });
    } else {
      res.status(404).json({ error: 'Allocation not found' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to delete allocation' });
  }
};
