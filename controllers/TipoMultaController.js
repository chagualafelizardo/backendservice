import TipoMulta from '../models/TipoMultas.js';
import { Op } from 'sequelize';

export const getAllTiposMulta = async (req, res) => {
  try {
    const tiposMulta = await TipoMulta.findAll();
    res.status(200).json(tiposMulta);
  } catch (error) {
    res.status(500).json({ 
      message: 'Error fetching fine types',
      error: error.message 
    });
  }
};

export const createTipoMulta = async (req, res) => {
  try {
    const { description, valorpagar } = req.body;

    // Validação dos campos obrigatórios
    if (!description || valorpagar === undefined) {
      return res.status(400).json({ 
        message: 'Description and payment value are required' 
      });
    }

    // Verifica se o valor é numérico
    if (isNaN(parseFloat(valorpagar))) {
      return res.status(400).json({ 
        message: 'Payment value must be a number' 
      });
    }

    // Verifica se já existe um tipo com mesma descrição
    const existingTipo = await TipoMulta.findOne({ 
      where: { description } 
    });
    
    if (existingTipo) {
      return res.status(400).json({ 
        message: 'Fine type with this description already exists' 
      });
    }

    // Cria o novo registro
    const newTipoMulta = await TipoMulta.create({
      description,
      valorpagar: parseFloat(valorpagar)
    });

    res.status(201).json(newTipoMulta);
  } catch (error) {
    if (error.name === 'SequelizeValidationError') {
      return res.status(400).json({ 
        message: 'Validation error',
        errors: error.errors.map(e => e.message) 
      });
    }
    res.status(500).json({ 
      message: 'Error creating fine type',
      error: error.message 
    });
  }
};

export const getTipoMultaById = async (req, res) => {
  try {
    const tipoMulta = await TipoMulta.findByPk(req.params.id);
    
    if (!tipoMulta) {
      return res.status(404).json({ 
        message: 'Fine type not found' 
      });
    }
    
    res.status(200).json(tipoMulta);
  } catch (error) {
    res.status(500).json({ 
      message: 'Error fetching fine type',
      error: error.message 
    });
  }
};

export const updateTipoMulta = async (req, res) => {
  try {
    const tipoMulta = await TipoMulta.findByPk(req.params.id);
    
    if (!tipoMulta) {
      return res.status(404).json({ 
        message: 'Fine type not found' 
      });
    }

    const { description, valorpagar } = req.body;

    // Validação dos campos
    if (!description || valorpagar === undefined) {
      return res.status(400).json({ 
        message: 'Description and payment value are required' 
      });
    }

    if (isNaN(parseFloat(valorpagar))) {
      return res.status(400).json({ 
        message: 'Payment value must be a number' 
      });
    }

    // Verifica se a descrição já existe em outro registro
    const existingTipo = await TipoMulta.findOne({
      where: {
        description,
        id: { [Op.ne]: req.params.id }
      }
    });

    if (existingTipo) {
      return res.status(400).json({ 
        message: 'Another fine type with this description already exists' 
      });
    }

    // Atualiza os campos
    tipoMulta.description = description;
    tipoMulta.valorpagar = parseFloat(valorpagar);
    await tipoMulta.save();

    res.status(200).json(tipoMulta);
  } catch (error) {
    if (error.name === 'SequelizeValidationError') {
      return res.status(400).json({ 
        message: 'Validation error',
        errors: error.errors.map(e => e.message) 
      });
    }
    res.status(500).json({ 
      message: 'Error updating fine type',
      error: error.message 
    });
  }
};

export const deleteTipoMulta = async (req, res) => {
  try {
    const tipoMulta = await TipoMulta.findByPk(req.params.id);
    
    if (!tipoMulta) {
      return res.status(404).json({ 
        message: 'Fine type not found' 
      });
    }

    await tipoMulta.destroy();
    res.status(200).json({ 
      message: 'Fine type deleted successfully' 
    });
  } catch (error) {
    res.status(500).json({ 
      message: 'Error deleting fine type',
      error: error.message 
    });
  }
};