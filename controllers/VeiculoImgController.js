import VeiculoImg from '../models/VeiculoImg.js';
import Veiculo from '../models/Veiculo.js';

// Função para buscar todas as imagens de um veículo por ID do veículo
export const findAllImagesByVeiculoId = async (req, res) => {
  try {
    const { veiculoId } = req.params;
    const images = await VeiculoImg.findAll({
      where: { veiculoId },
      include: [{
        model: Veiculo,
        as: 'veiculo',
      }],
    });

    const response = images.map(image => ({
      ...image.toJSON(),
      imageBase64: image.data ? image.data.toString('base64') : null, // Converte a imagem para Base64
    }));

    res.json(response);
  } catch (error) {
    console.error("Erro ao buscar imagens do veículo:", error);
    res.status(500).send("Erro ao buscar imagens do veículo");
  }
};

// Função para adicionar uma nova imagem a um veículo
export const addImageToVeiculo = async (req, res) => {
  try {
    const { image } = req.body;
    
    if (!image) {
      return res.status(400).json({ message: 'Image is required' });
    }

    const imageBuffer = Buffer.from(image, 'base64');

    const newImage = await VeiculoImg.create({
      veiculoId: req.params.veiculoId,
      image: imageBuffer
    });

    res.status(201).json(newImage);
  } catch (error) {
    console.error('Error adding image:', error);
    res.status(500).json({ error: 'Failed to add image' });
  }
};


// Função para deletar uma imagem por ID
export const deleteImageById = async (req, res) => {
  try {
    const { id } = req.params;
    const image = await VeiculoImg.findByPk(id);
    
    if (image) {
      await image.destroy();
      res.json({ message: 'Image deleted successfully' });
    } else {
      res.status(404).json({ error: 'Image not found' });
    }
  } catch (error) {
    console.error("Erro ao deletar imagem:", error);
    res.status(500).json({ error: 'Failed to delete image' });
  }
};
