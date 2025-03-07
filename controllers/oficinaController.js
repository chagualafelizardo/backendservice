import Oficina from '../models/Oficina.js';

export const createOficina = async (req, res) => {
  try {
    const { nome_oficina, endereco, telefone, obs } = req.body;
    const newOficina = await Oficina.create({ nome_oficina, endereco, telefone, obs });
    res.status(201).json(newOficina);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const getOficinas = async (req, res) => {
  try {
    const oficinas = await Oficina.findAll();
    res.status(200).json(oficinas);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const getOficinaById = async (req, res) => {
  try {
    const { id } = req.params;
    const oficina = await Oficina.findByPk(id);
    if (oficina) {
      res.status(200).json(oficina);
    } else {
      res.status(404).json({ message: 'Oficina not found' });
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const updateOficina = async (req, res) => {
  try {
    const { id } = req.params;
    const { nome_oficina, endereco, telefone, obs } = req.body;
    const oficina = await Oficina.findByPk(id);
    if (oficina) {
      oficina.nome_oficina = nome_oficina;
      oficina.endereco = endereco;
      oficina.telefone = telefone;
      oficina.obs = obs;
      await oficina.save();
      res.status(200).json(oficina);
    } else {
      res.status(404).json({ message: 'Oficina not found' });
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const deleteOficina = async (req, res) => {
  try {
    const { id } = req.params;
    const oficina = await Oficina.findByPk(id);
    if (oficina) {
      await oficina.destroy();
      res.status(200).json({ message: 'Oficina deleted successfully' });
    } else {
      res.status(404).json({ message: 'Oficina not found' });
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
