import ExtendServiceDay from '../models/ExtendServiceDay.js';
import { Op } from 'sequelize';

// Criar novo extend service day
export const createExtendServiceDay = async (req, res) => {
  try {
    const { date, notes, atendimentoId } = req.body;
    const newExtend = await ExtendServiceDay.create({ date, notes, atendimentoId });
    res.status(201).json(newExtend);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Buscar todos os registros
export const getAllExtendServiceDays = async (req, res) => {
  try {
    const extendsList = await ExtendServiceDay.findAll();
    res.status(200).json(extendsList);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Buscar por ID
export const getExtendServiceDayById = async (req, res) => {
  const { id } = req.params;
  try {
    const extend = await ExtendServiceDay.findByPk(id);
    if (extend) {
      res.status(200).json(extend);
    } else {
      res.status(404).json({ message: 'ExtendServiceDay not found' });
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Buscar por atendimentoId (como parâmetro de rota)
export const fetchByAtendimentoId = async (req, res) => {
  const { atendimentoId } = req.params;
  try {
    const extendsList = await ExtendServiceDay.findAll({
      where: { atendimentoId }
    });
    res.status(200).json(extendsList);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Atualizar
export const updateExtendServiceDay = async (req, res) => {
  const { id } = req.params;
  const { date, notes, atendimentoId } = req.body;
  try {
    const extend = await ExtendServiceDay.findByPk(id);
    if (extend) {
      extend.date = date;
      extend.notes = notes;
      extend.atendimentoId = atendimentoId;
      await extend.save();
      res.status(200).json(extend);
    } else {
      res.status(404).json({ message: 'ExtendServiceDay not found' });
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Deletar
export const deleteExtendServiceDay = async (req, res) => {
  const { id } = req.params;
  try {
    const extend = await ExtendServiceDay.findByPk(id);
    if (extend) {
      await extend.destroy();
      res.status(204).send(); // No content
    } else {
      res.status(404).json({ message: 'ExtendServiceDay not found' });
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
