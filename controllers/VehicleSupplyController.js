import VehicleSupply from '../models/VehicleSupply.js';

// Criar um novo supply
export const createVehicleSupply = async (req, res) => {
  try {
    const { name, description, stock } = req.body;

    const newSupply = await VehicleSupply.create({
      name,
      description,
      stock,
    });

    res.status(201).json({
      message: 'Vehicle supply created successfully.',
      data: newSupply,
    });
  } catch (error) {
    res.status(500).json({
      message: 'Error creating vehicle supply.',
      error: error.message,
    });
  }
};

// Listar todos os supplies
export const getAllVehicleSupplies = async (req, res) => {
  try {
    const supplies = await VehicleSupply.findAll();
    res.status(200).json({ data: supplies });
  } catch (error) {
    res.status(500).json({
      message: 'Error fetching vehicle supplies.',
      error: error.message,
    });
  }
};

// Obter um supply pelo ID
export const getVehicleSupplyById = async (req, res) => {
  try {
    const { id } = req.params;

    const supply = await VehicleSupply.findByPk(id);

    if (!supply) {
      return res.status(404).json({ message: 'Vehicle supply not found.' });
    }

    res.status(200).json({ data: supply });
  } catch (error) {
    res.status(500).json({
      message: 'Error fetching vehicle supply.',
      error: error.message,
    });
  }
};

// Atualizar um supply pelo ID
export const updateVehicleSupply = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, description, stock } = req.body;

    const supply = await VehicleSupply.findByPk(id);

    if (!supply) {
      return res.status(404).json({ message: 'Vehicle supply not found.' });
    }

    await supply.update({
      name,
      description,
      stock,
    });

    res.status(200).json({
      message: 'Vehicle supply updated successfully.',
      data: supply,
    });
  } catch (error) {
    res.status(500).json({
      message: 'Error updating vehicle supply.',
      error: error.message,
    });
  }
};

// Excluir um supply pelo ID
export const deleteVehicleSupply = async (req, res) => {
  try {
    const { id } = req.params;

    const supply = await VehicleSupply.findByPk(id);

    if (!supply) {
      return res.status(404).json({ message: 'Vehicle supply not found.' });
    }

    await supply.destroy();

    res.status(200).json({
      message: 'Vehicle supply deleted successfully.',
    });
  } catch (error) {
    res.status(500).json({
      message: 'Error deleting vehicle supply.',
      error: error.message,
    });
  }
};