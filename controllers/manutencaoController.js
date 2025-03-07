import Manutencao from '../models/Manutencao.js';
import Veiculo from '../models/Veiculo.js'; // Importe o modelo Veiculo

export const findAllManutencoes = async (req, res) => {
  try {
    const manutencoes = await Manutencao.findAll();
    res.json(manutencoes);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to fetch manutencoes' });
  }
};

// Função para adicionar uma nova manutenção
export const addManutencao = async (req, res) => {
  const { data_entrada, data_saida, obs, veiculoID, oficinaID, atendimentoID } = req.body;

  // Validação dos campos obrigatórios
  if (!data_entrada || !veiculoID || !oficinaID || !atendimentoID) {
    return res.status(400).json({ error: 'data_entrada, veiculoID, oficinaID, and atendimentoID are required' });
  }

  try {
    const manutencao = await Manutencao.create({
      data_entrada,
      data_saida,
      obs,
      veiculoID,
      oficinaID,
      atendimentoID,
    });
    res.status(201).json(manutencao);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to create manutencao' });
  }
};

// Função para adicionar uma nova manutenção
export const addEnviaManutencao = async (req, res) => {
    const { obs, veiculoID, oficinaID, atendimentoID } = req.body;

    // Log dos dados recebidos
    console.log('Dados recebidos:');
    console.log('obs:', obs);
    console.log('veiculoID:', veiculoID);
    console.log('oficinaID:', oficinaID);
    console.log('atendimentoID:', atendimentoID);

    // Validação dos campos obrigatórios
    if (!veiculoID || !atendimentoID) {
      console.error('Erro de validação: veiculoID e atendimentoID são obrigatórios');
      return res.status(400).json({ error: 'veiculoID and atendimentoID are required' });
    }

    try {
      const manutencao = await Manutencao.create({
        data_entrada: new Date(), // Define a data de entrada como a data atual
        data_saida: null, // Data de saída é nula por padrão
        obs: obs || null, // Observações podem ser nulas
        veiculoID,
        oficinaID: oficinaID || null, // Oficina pode ser nula
        atendimentoID,
      });

      // Log da manutenção criada
      console.log('Manutenção criada com sucesso:', manutencao);

      res.status(201).json(manutencao);
    } catch (error) {
      console.error('Erro ao criar manutenção:', error);
      res.status(500).json({ error: 'Failed to create manutencao' });
    }
  };

// Função para buscar uma manutenção por ID
export const getManutencaoById = async (req, res) => {
  try {
    const manutencao = await Manutencao.findByPk(req.params.id);
    if (manutencao) {
      res.json(manutencao);
    } else {
      res.status(404).json({ error: 'Manutencao not found' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to fetch manutencao' });
  }
};

// Função para atualizar uma manutenção por ID
export const updateManutencao = async (req, res) => {
  try {
    const manutencao = await Manutencao.findByPk(req.params.id);
    if (manutencao) {
      const { data_entrada, data_saida, obs, veiculoID, oficinaID, atendimentoID } = req.body;

      await manutencao.update({
        data_entrada,
        data_saida,
        obs,
        veiculoID,
        oficinaID,
        atendimentoID,
      });

      res.json(manutencao);
    } else {
      res.status(404).json({ error: 'Manutencao not found' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to update manutencao' });
  }
};

// Função para deletar uma manutenção por ID
export const deleteManutencao = async (req, res) => {
  try {
    const manutencao = await Manutencao.findByPk(req.params.id);
    if (manutencao) {
      await manutencao.destroy();
      res.json({ message: 'Manutencao deleted' });
    } else {
      res.status(404).json({ error: 'Manutencao not found' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to delete manutencao' });
  }
};

// Função para buscar veículos em manutenção
// export const getVehiclesInMaintenance = async (req, res) => {
//   try {
//     console.log('Fetching vehicles in maintenance...');

//     // Realiza o JOIN entre Manutencao e Veiculo
//     const vehiclesInMaintenance = await Manutencao.findAll({
//       attributes: ['id', 'data_entrada', 'data_saida', 'obs'],
//       include: [
//         {
//           model: Veiculo,
//           as: 'veiculo',
//           attributes: ['id', 'matricula', 'marca', 'modelo'],
//           required: true,
//         },
//       ],
//     });

//     console.log('Vehicles in maintenance fetched successfully:', vehiclesInMaintenance);

//     if (vehiclesInMaintenance.length === 0) {
//       console.log('No vehicles in maintenance found.');
//       return res.status(404).json({ message: 'No vehicles in maintenance found' });
//     }

//     // Mapeia os resultados para incluir apenas os dados necessários
//     const result = vehiclesInMaintenance.map((item) => ({
//       manutencaoId: item.id,
//       dataEntrada: item.data_entrada,
//       dataSaida: item.data_saida,
//       obs: item.obs,
//       veiculo: {
//         id: item.veiculo.id,
//         matricula: item.veiculo.matricula,
//         marca: item.veiculo.marca,
//         modelo: item.veiculo.modelo,
//       },
//     }));

//     console.log('Processed vehicles in maintenance:', result);
//     res.json(result);
//   } catch (error) {
//     console.error('Error fetching vehicles in maintenance:', error);
//     res.status(500).json({ error: 'Failed to fetch vehicles in maintenance' });
//   }
// };

// Novo endpoint para buscar manutenções com dados completos dos veículos
export const findAllManutencoesComVeiculos = async (req, res) => {
  try {
    console.log('Iniciando busca de manutenções com veículos...');

    // Busca todas as manutenções, incluindo os dados do veículo associado
    const manutencoes = await Manutencao.findAll({
      include: [
        {
          model: Veiculo,
          as: 'veiculo', // Nome da relação definida no modelo
          attributes: ['id', 'marca', 'modelo', 'ano', 'placa'], // Campos que você quer retornar do veículo
        },
      ],
    });

    console.log('Manutenções encontradas:', manutencoes.length);

    // Verifica se há manutenções
    if (manutencoes.length === 0) {
      console.log('Nenhuma manutenção encontrada.');
      return res.status(404).json({ message: 'Nenhuma manutenção encontrada.' });
    }

    console.log('Dados das manutenções com veículos:', JSON.stringify(manutencoes, null, 2));

    res.json(manutencoes);
  } catch (error) {
    console.error('Erro ao buscar manutenções com veículos:', error);
    res.status(500).json({ error: 'Failed to fetch manutencoes with vehicles' });
  }
};