import Multa from '../models/Multa.js';
import { Op } from 'sequelize';

export const getAllMultas = async (req, res) => {
  try {
    const multas = await Multa.findAll();
    res.status(200).json({
      success: true,
      data: multas
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Erro ao buscar multas',
      error: error.message
    });
  }
};

export const createMulta = async (req, res) => {
  try {
    const { description, valorpagar, observation } = req.body;

    const newMulta = await Multa.create({
      description,
      valorpagar,
      observation: observation || null
    });

    res.status(201).json({
      success: true,
      data: newMulta,
      message: 'Multa criada com sucesso'
    });
  } catch (error) {
    if (error.name === 'SequelizeValidationError') {
      return res.status(400).json({
        success: false,
        message: 'Erro de validação',
        errors: error.errors.map(e => e.message)
      });
    }
    res.status(500).json({
      success: false,
      message: 'Erro ao criar multa',
      error: error.message
    });
  }
};

export const getMultaById = async (req, res) => {
  try {
    const multa = await Multa.findByPk(req.params.id);
    
    if (!multa) {
      return res.status(404).json({
        success: false,
        message: 'Multa não encontrada'
      });
    }

    res.status(200).json({
      success: true,
      data: multa
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Erro ao buscar multa',
      error: error.message
    });
  }
};

export const updateMulta = async (req, res) => {
  try {
    const multa = await Multa.findByPk(req.params.id);
    
    if (!multa) {
      return res.status(404).json({
        success: false,
        message: 'Multa não encontrada'
      });
    }

    const { description, valorpagar, observation } = req.body;

    await multa.update({
      description: description || multa.description,
      valorpagar: valorpagar || multa.valorpagar,
      observation: observation !== undefined ? observation : multa.observation
    });

    res.status(200).json({
      success: true,
      data: multa,
      message: 'Multa atualizada com sucesso'
    });
  } catch (error) {
    if (error.name === 'SequelizeValidationError') {
      return res.status(400).json({
        success: false,
        message: 'Erro de validação',
        errors: error.errors.map(e => e.message)
      });
    }
    res.status(500).json({
      success: false,
      message: 'Erro ao atualizar multa',
      error: error.message
    });
  }
};

export const deleteMulta = async (req, res) => {
  try {
    const multa = await Multa.findByPk(req.params.id);
    
    if (!multa) {
      return res.status(404).json({
        success: false,
        message: 'Multa não encontrada'
      });
    }

    await multa.destroy();
    
    res.status(200).json({
      success: true,
      message: 'Multa removida com sucesso'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Erro ao remover multa',
      error: error.message
    });
  }
};