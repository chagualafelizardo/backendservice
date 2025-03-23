import VeiculoDetails from '../models/VeiculoDetails.js';

// Função para buscar todos os detalhes de veículos
export const getAllVeiculoDetails = async (req, res) => {
  try {
    const veiculoDetails = await VeiculoDetails.findAll();
    res.json(veiculoDetails);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to fetch veiculo details' });
  }
};

// Função para buscar detalhes de um veículo por ID
export const getVeiculoDetailsById = async (req, res) => {
  try {
    const veiculoDetails = await VeiculoDetails.findByPk(req.params.id);
    if (veiculoDetails) {
      res.json(veiculoDetails);
    } else {
      res.status(404).json({ error: 'Veiculo details not found' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to fetch veiculo details' });
  }
};

// Função para criar novos detalhes de veículo
export const createVeiculoDetails = async (req, res) => {
  try {
    const { description, startDate, endDate, obs, veiculoId } = req.body;

    // Verifica se todos os campos obrigatórios estão presentes
    if (!description || !startDate || !endDate || !veiculoId) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    const veiculoDetails = await VeiculoDetails.create({
      description,
      startDate,
      endDate,
      obs,
      veiculoId,
    });

    res.status(201).json(veiculoDetails);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to create veiculo details' });
  }
};

// Função para atualizar detalhes de veículo por ID
export const updateVeiculoDetails = async (req, res) => {
  try {
    const veiculoDetails = await VeiculoDetails.findByPk(req.params.id);
    if (veiculoDetails) {
      const { description, startDate, endDate, obs, veiculoId } = req.body;

      // Atualiza apenas os campos fornecidos no corpo da requisição
      await veiculoDetails.update({
        description: description || veiculoDetails.description,
        startDate: startDate || veiculoDetails.startDate,
        endDate: endDate || veiculoDetails.endDate,
        obs: obs || veiculoDetails.obs,
        veiculoId: veiculoId || veiculoDetails.veiculoId,
      });

      res.json(veiculoDetails);
    } else {
      res.status(404).json({ error: 'Veiculo details not found' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to update veiculo details' });
  }
};

// Função para deletar detalhes de veículo por ID
export const deleteVeiculoDetails = async (req, res) => {
  try {
    const veiculoDetails = await VeiculoDetails.findByPk(req.params.id);
    if (veiculoDetails) {
      await veiculoDetails.destroy();
      res.json({ message: 'Veiculo details deleted' });
    } else {
      res.status(404).json({ error: 'Veiculo details not found' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to delete veiculo details' });
  }
};