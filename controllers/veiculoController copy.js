import Veiculo from '../models/Veiculo.js';

// Função para buscar todos os veículos
export const findAll = async (req, res) => {
  try {
    const veiculos = await Veiculo.findAll();
    // Convertendo as imagens para Base64 antes de enviar a resposta
    const response = veiculos.map(veiculo => {
      const imageBase64 = veiculo.image ? veiculo.image.toString('base64') : null;
      return {
        ...veiculo.toJSON(),
        imagemBase64: imageBase64,
      };
    });
    res.json(response);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to fetch vehicles' });
  }
};

// Função para adicionar um novo veículo
export const addVeiculo = async (req, res) => {
  try {
    const {
      matricula, marca, modelo, ano, cor, image, num_chassi, num_lugares, num_motor, num_portas, tipo_combustivel, state
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
      state // Adiciona o estado do veículo
    });
    
    // Inclua a imagem como Base64 na resposta
    const imageBase64 = veiculo.image ? veiculo.image.toString('base64') : null;
    veiculo.image = imageBase64;
    
    res.status(201).json(veiculo);
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
      res.json(veiculo);
    } else {
      res.status(404).json({ error: 'Vehicle not found' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to fetch vehicle' });
  }
};

// Função para atualizar um veículo por ID
export const updateVeiculo = async (req, res) => {
  try {
    const veiculo = await Veiculo.findByPk(req.params.id);
    if (veiculo) {
      const {
        matricula, marca, modelo, ano, cor, image, num_chassi, num_lugares, num_motor, num_portas, tipo_combustivel, state
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
        state // Atualiza o estado do veículo
      });
      
      // Inclua a imagem como Base64 na resposta
      if (veiculo.image) {
        veiculo.image = `data:image/jpeg;base64,${veiculo.image.toString('base64')}`;
      }
      
      res.json(veiculo);
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
