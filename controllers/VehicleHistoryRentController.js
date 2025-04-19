import VehicleHistoryRent from '../models/VehicleHistoryRent.js';
import Veiculo from '../models/Veiculo.js';

// Função para buscar todos os históricos de valor de aluguer
export const getAllVehicleHistoryRents = async (req, res) => {
  try {
    const history = await VehicleHistoryRent.findAll({
      include: Veiculo, // Inclui os dados do veículo
    });
    res.json(history);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to fetch vehicle rent history' });
  }
};

// Função para criar um novo histórico de valor de aluguer
// export const createVehicleHistoryRent = async (req, res) => {
//   try {
//     const { data_valor, valor, obs, veiculoID } = req.body;

//     const history = await VehicleHistoryRent.create({
//       data_valor,
//       valor,
//       obs,
//       veiculoID
//     });

//     res.status(201).json(history);
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ error: 'Failed to create vehicle rent history' });
//   }
// };

export const createVehicleHistoryRent = async (req, res) => {
  try {
    const { data_valor, valor, obs, veiculoID } = req.body;
    
    // Garante que valor é numérico
    const numericValue = typeof valor === 'string' 
      ? parseFloat(valor.replace(',', '.')) 
      : valor;

    const history = await VehicleHistoryRent.create({
      data_valor,
      valor: numericValue,
      obs,
      veiculoID
    });

    res.status(201).json(history);
  } catch (error) {
    console.error('Error creating vehicle history:', error);
    res.status(500).json({ 
      error: 'Failed to create vehicle rent history',
      details: error.message 
    });
  }
};

// Função para buscar um histórico de valor por ID
export const getVehicleHistoryRentById = async (req, res) => {
  try {
    const history = await VehicleHistoryRent.findByPk(req.params.id, {
      include: Veiculo,
    });
    if (history) {
      res.json(history);
    } else {
      res.status(404).json({ error: 'Vehicle rent history not found' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to fetch vehicle rent history' });
  }
};

// Função para atualizar um histórico de valor por ID
export const updateVehicleHistoryRent = async (req, res) => {
  try {
    const { data_valor, valor, obs, veiculoID } = req.body;

    const history = await VehicleHistoryRent.findByPk(req.params.id);
    if (history) {
      await history.update({
        data_valor,
        valor,
        obs,
        veiculoID
      });
      res.json(history);
    } else {
      res.status(404).json({ error: 'Vehicle rent history not found' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to update vehicle rent history' });
  }
};

// Função para deletar um histórico de valor por ID
export const deleteVehicleHistoryRent = async (req, res) => {
  try {
    const history = await VehicleHistoryRent.findByPk(req.params.id);
    if (history) {
      await history.destroy();
      res.json({ message: 'Vehicle rent history deleted' });
    } else {
      res.status(404).json({ error: 'Vehicle rent history not found' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to delete vehicle rent history' });
  }
};

// Novo endpoint para buscar histórico por veiculoID
export const getVehicleHistoryRentsByVeiculoId = async (req, res) => {
  try {
    const { veiculoId } = req.params;
    
    const history = await VehicleHistoryRent.findAll({
      where: { veiculoID: veiculoId },
      include: Veiculo,
      order: [['datavalor', 'DESC']] // Ordena por data mais recente primeiro
    });

    if (history && history.length > 0) {
      res.json(history);
    } else {
      res.status(404).json({ 
        message: 'No rent history found for this vehicle',
        veiculoId: veiculoId
      });
    }
  } catch (error) {
    console.error('Error fetching vehicle rent history by veiculoID:', error);
    res.status(500).json({ 
      error: 'Failed to fetch vehicle rent history',
      details: error.message 
    });
  }
};

// Novo endpoint no controller
// export const getLatestVehicleRentValue = async (req, res) => {
//   try {
//     const history = await VehicleHistoryRent.findOne({
//       where: { veiculoID: req.params.veiculoId },
//       order: [['datavalor', 'DESC']], // Ordena por data descendente
//       attributes: ['valor'] // Retorna apenas o valor
//     });

//     if (history) {
//       res.json({ valor: history.valor });
//     } else {
//       res.json({ valor: null });
//     }
//   } catch (error) {
//     console.error('Error fetching latest rent value:', error);
//     res.status(500).json({ error: 'Failed to fetch latest rent value' });
//   }
// };

export const getLatestVehicleRentValue = async (req, res) => {
  try {
    const history = await VehicleHistoryRent.findOne({
      where: { veiculoID: req.params.veiculoId },
      order: [['datavalor', 'DESC']],
      attributes: ['valor']
    });

    if (history) {
      // Garante que o valor será enviado como número
      res.json({ 
        valor: parseFloat(history.valor) || history.valor 
      });
    } else {
      res.json({ valor: null });
    }
  } catch (error) {
    console.error('Error fetching latest rent value:', error);
    res.status(500).json({ 
      error: 'Failed to fetch latest rent value',
      details: error.message 
    });
  }
};