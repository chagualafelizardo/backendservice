import express from 'express';
import Posto from '../models/Posto.js';

const router = express.Router();

export const createPosto = async (req, res) => {
  try {
    const { nome_posto, endereco, telefone, obs } = req.body;
    const newPosto = await Posto.create({ nome_posto, endereco, telefone, obs });
    res.status(201).json(newPosto);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const getPostos = async (req, res) => {
  try {
    const postos = await Posto.findAll();
    res.status(200).json(postos);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const getPostoById = async (req, res) => {
  try {
    const { id } = req.params;
    const posto = await Posto.findByPk(id);
    if (posto) {
      res.status(200).json(posto);
    } else {
      res.status(404).json({ message: 'Posto not found' });
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const updatePosto = async (req, res) => {
  try {
    const { id } = req.params;
    const { nome_posto, endereco, telefone, obs } = req.body;
    const posto = await Posto.findByPk(id);
    if (posto) {
      posto.nome_posto = nome_posto;
      posto.endereco = endereco;
      posto.telefone = telefone;
      posto.obs = obs;
      await posto.save();
      res.status(200).json(posto);
    } else {
      res.status(404).json({ message: 'Posto not found' });
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const deletePosto = async (req, res) => {
  try {
    const { id } = req.params;
    const posto = await Posto.findByPk(id);
    if (posto) {
      await posto.destroy();
      res.status(200).json({ message: 'Posto deleted successfully' });
    } else {
      res.status(404).json({ message: 'Posto not found' });
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export default router;
