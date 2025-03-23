import Veiculo from '../models/Veiculo.js';
import Manutencao from '../models/Manutencao.js'; // Importe o modelo Manutencao
import VeiculoDetails from '../models/VeiculoDetails.js'; // Importa o modelo VeiculoDetails

// Função para buscar todos os veículos
export const findAll = async (req, res) => {
  try {
    const veiculos = await Veiculo.findAll();
    // Convertendo as imagens para Base64 antes de enviar a resposta
    const response = veiculos.map(veiculo => {
      const imageBase64 = veiculo.image ? veiculo.image.toString('base64') : null;
      return {
        ...veiculo.toJSON(),
        imagemBase64: imageBase64 // Adicionando a imagem convertida para Base64
      };
    });

    res.json(response);
  } catch (error) {
    console.error("Erro ao buscar veículos:", error);
    res.status(500).send("Erro ao buscar veículos");
  }
};

// Função para adicionar um novo veículo
export const addVeiculo = async (req, res) => {
  try {
    const {
      matricula, marca, modelo, ano, cor, image, num_chassi, num_lugares, num_motor, num_portas, tipo_combustivel, state, rentalIncludesDriver, isAvailable
    } = req.body;
    
    // Converte a imagem para Buffer se necessário
    const imageBuffer = image ? Buffer.from(image, 'base64') : null;
    
    const veiculo = await Veiculo.create({
      matricula,
      marca,
      modelo,
      ano,
      cor,
      image: imageBuffer, // Armazena o Buffer da imagem
      num_chassi,
      num_lugares,
      num_motor,
      num_portas,
      tipo_combustivel,
      state,
      rentalIncludesDriver,
      isAvailable // Adiciona o novo campo
    });
    
    // Inclua a imagem como Base64 na resposta
    const imageBase64 = veiculo.image ? veiculo.image.toString('base64') : null;
    veiculo.image = imageBase64;
    
    res.status(201).json({
      ...veiculo.toJSON(),
      rentalIncludesDriver: veiculo.rentalIncludesDriver,
      isAvailable: veiculo.isAvailable // Inclui isAvailable na resposta
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to create vehicle' });
  }
};

// Função para buscar um veículo por ID
export const getVeiculoById = async (req, res) => {
  try {
    const veiculo = await Veiculo.findByPk(req.params.id);
    if (veiculo) {
      // Inclua a imagem como uma URL base64
      if (veiculo.image) {
        veiculo.image = `data:image/jpeg;base64,${veiculo.image.toString('base64')}`;
      }
      res.json({
        ...veiculo.toJSON(),
        rentalIncludesDriver: veiculo.rentalIncludesDriver,
        isAvailable: veiculo.isAvailable // Inclui isAvailable na resposta
      });
    } else {
      res.status(404).json({ error: 'Vehicle not found' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to fetch vehicle' });
  }
};

// Função para buscar um veículo por matricula
export const getVeiculoByMatricula = async (req, res) => {
  try {
    // Recupera a matricula do veículo da requisição
    const matricula = req.params.matricula;

    // Busca o veículo no banco de dados utilizando a matricula
    const veiculo = await Veiculo.findOne({
      where: { matricula: matricula }  // Busca pelo campo matricula
    });

    if (veiculo) {
      // Retorna o ID do veículo encontrado
      res.json({ id: veiculo.id });
    } else {
      // Se o veículo não for encontrado, retorna erro 404
      res.status(404).json({ error: 'Vehicle not found' });
    }
  } catch (error) {
    console.error(error);
    // Se ocorrer algum erro, retorna erro 500
    res.status(500).json({ error: 'Failed to fetch vehicle by matricula' });
  }
};

export const getVeiculoByMatriculaM = async (req, res) => {
  try {
    // Recupera a matrícula do veículo da requisição
    const matricula = req.params.matricula;

    // Busca o veículo no banco de dados utilizando a matrícula
    const veiculo = await Veiculo.findOne({
      where: { matricula: matricula }  // Busca pelo campo matrícula
    });

    if (veiculo) {
      // Retorna todos os campos do veículo encontrado
      res.json(veiculo);
    } else {
      // Se o veículo não for encontrado, retorna erro 404
      res.status(404).json({ error: 'Vehicle not found' });
    }
  } catch (error) {
    console.error(error);
    // Se ocorrer algum erro, retorna erro 500
    res.status(500).json({ error: 'Failed to fetch vehicle by matricula' });
  }
};


// Função para atualizar um veículo por ID
export const updateVeiculo = async (req, res) => {
  try {
    const veiculo = await Veiculo.findByPk(req.params.id);
    if (veiculo) {
      const {
        matricula, marca, modelo, ano, cor, image, num_chassi, num_lugares, num_motor, num_portas, tipo_combustivel, state, rentalIncludesDriver, isAvailable
      } = req.body;
      
      // Converte a imagem para Buffer se necessário
      const imageBuffer = image ? Buffer.from(image, 'base64') : null;
      
      await veiculo.update({
        matricula,
        marca,
        modelo,
        ano,
        cor,
        image: imageBuffer, // Atualiza o Buffer da imagem
        num_chassi,
        num_lugares,
        num_motor,
        num_portas,
        tipo_combustivel,
        state,
        rentalIncludesDriver,
        isAvailable // Atualiza o campo isAvailable
      });
      
      // Inclua a imagem como Base64 na resposta
      if (veiculo.image) {
        veiculo.image = `data:image/jpeg;base64,${veiculo.image.toString('base64')}`;
      }
      
      res.json({
        ...veiculo.toJSON(),
        rentalIncludesDriver: veiculo.rentalIncludesDriver,
        isAvailable: veiculo.isAvailable // Inclui isAvailable na resposta
      });
    } else {
      res.status(404).json({ error: 'Vehicle not found' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to update vehicle' });
  }
};

// Função para deletar um veículo por ID
export const deleteVeiculo = async (req, res) => {
  try {
    const veiculo = await Veiculo.findByPk(req.params.id);
    if (veiculo) {
      await veiculo.destroy();
      res.json({ message: 'Vehicle deleted' });
    } else {
      res.status(404).json({ error: 'Vehicle not found' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to delete vehicle' });
  }
};

// Função para buscar todos os veículos com rentalIncludesDriver=true
export const findAllWithDriver = async (req, res) => {
  try {
    const veiculos = await Veiculo.findAll({
      where: { rentalIncludesDriver: 1 } // Filtra apenas veículos com motorista
    });

    // Convertendo as imagens para Base64 antes de enviar a resposta
    const response = veiculos.map(veiculo => {
      const imageBase64 = veiculo.image ? veiculo.image.toString('base64') : null;
      return {
        ...veiculo.toJSON(),
        imagemBase64: imageBase64 // Adicionando a imagem convertida para Base64
      };
    });

    res.json(response);
  } catch (error) {
    console.error("Erro ao buscar veículos com motorista:", error);
    res.status(500).send("Erro ao buscar veículos com motorista");
  }
};

// Função para buscar todos os veículos disponíveis
export const findAllAvailable = async (req, res) => {
  try {
    const veiculos = await Veiculo.findAll({
      where: { isAvailable: true } // Filtra apenas veículos disponíveis
    });

    // Convertendo as imagens para Base64 antes de enviar a resposta
    const response = veiculos.map(veiculo => {
      const imageBase64 = veiculo.image ? veiculo.image.toString('base64') : null;
      return {
        ...veiculo.toJSON(),
        imagemBase64: imageBase64 // Adicionando a imagem convertida para Base64
      };
    });

    res.json(response);
  } catch (error) {
    console.error("Erro ao buscar veículos disponíveis:", error);
    res.status(500).send("Erro ao buscar veículos disponíveis");
  }
};


// Função para atualizar o campo isAvailable de um veículo por ID
export const updateIsAvailable = async (req, res) => {
  try {
    const { id } = req.params; // ID do veículo recebido via parâmetro
    const { isAvailable } = req.body; // Novo valor do campo isAvailable recebido no corpo da requisição

    // Encontra o veículo pelo ID
    const veiculo = await Veiculo.findByPk(id);

    if (veiculo) {
      // Atualiza o campo isAvailable
      await veiculo.update({ isAvailable });

      res.json({
        message: 'Vehicle availability updated successfully',
        veiculo: {
          id: veiculo.id,
          isAvailable: veiculo.isAvailable,
        },
      });
    } else {
      res.status(404).json({ error: 'Vehicle not found' });
    }
  } catch (error) {
    console.error('Erro ao atualizar isAvailable:', error);
    res.status(500).json({ error: 'Failed to update vehicle availability' });
  }
};

export const updateIsAvailableByMatricula = async (req, res) => {
  try {
    const { matricula } = req.params; // Matrícula do veículo recebida via parâmetro
    const { isAvailable } = req.body; // Novo valor do campo isAvailable recebido no corpo da requisição

    // Encontra o veículo pela matrícula
    const veiculo = await Veiculo.findOne({ where: { matricula } });

    if (veiculo) {
      // Atualiza o campo isAvailable
      await veiculo.update({ isAvailable });

      res.json({
        message: 'Vehicle availability updated successfully',
        veiculo: {
          matricula: veiculo.matricula,
          isAvailable: veiculo.isAvailable,
        },
      });
    } else {
      res.status(404).json({ error: 'Vehicle not found' });
    }
  } catch (error) {
    console.error('Erro ao atualizar isAvailable:', error);
    res.status(500).json({ error: 'Failed to update vehicle availability' });
  }
};

// Função para buscar todos os veículos que estão na tabela de manutenção
// Função para buscar todos os veículos que estão na tabela de manutenção
export const findVeiculosEmManutencao = async (req, res) => {
  try {
    console.log('Iniciando busca de veículos na tabela de manutenção...');

    // Busca veículos que estão na tabela de manutenção
    const veiculos = await Veiculo.findAll({
      include: [
        {
          model: Manutencao,
          as: 'manutencoes', // Nome da relação definida no modelo Veiculo
          required: true, // Garante que apenas veículos com manutenções sejam retornados
        },
      ],
    });

    console.log('Veículos na tabela de manutenção encontrados:', veiculos.length);

    // Verifica se há veículos na tabela de manutenção
    if (veiculos.length === 0) {
      console.log('Nenhum veículo na tabela de manutenção encontrado.');
      return res.status(404).json({ message: 'Nenhum veículo na tabela de manutenção encontrado.' });
    }

    console.log('Dados dos veículos na tabela de manutenção:', JSON.stringify(veiculos, null, 2));

    res.json(veiculos);
  } catch (error) {
    console.error('Erro ao buscar veículos na tabela de manutenção:', error);
    res.status(500).json({ error: 'Failed to fetch vehicles in maintenance table' });
  }
};

// Função para buscar um veículo por ID com seus detalhes
export const getVeiculoWithDetails = async (req, res) => {
  try {
    const veiculo = await Veiculo.findByPk(req.params.id, {
      include: [
        {
          model: VeiculoDetails, // Inclui os detalhes do veículo
          as: 'details', // Alias da associação (deve corresponder à associação definida no modelo)
        },
      ],
    });

    if (veiculo) {
      res.json(veiculo);
    } else {
      res.status(404).json({ error: 'Veiculo not found' });
    }
  } catch (error) {
    console.error('Error fetching veiculo with details:', error);
    res.status(500).json({ error: 'Failed to fetch veiculo with details' });
  }
};