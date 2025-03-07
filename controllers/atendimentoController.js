import Atendimento from '../models/Atendimento.js';

// Função para buscar todos os atendimentos
export const findAllAtendimentos = async (req, res) => {
  try {
    const atendimentos = await Atendimento.findAll();
    res.json(atendimentos);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to fetch atendimentos' });
  }
};

// Função para adicionar um novo atendimento
export const addAtendimento = async (req, res) => {
  const { data_saida, data_chegada,data_devolucao, destino, km_inicial, km_final, reserveID } = req.body;

  if (!reserveID) {
    return res.status(400).json({ error: 'reserveID is required' });
  }

  try {
    const atendimento = await Atendimento.create({
      data_saida,
      data_chegada,
      data_devolucao,
      destino,
      km_inicial,
      km_final,
      reservaId: reserveID,
    });
    res.status(201).json(atendimento);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to create atendimento' });
  }
};


// Função para buscar um atendimento por ID
export const getAtendimentoById = async (req, res) => {
  try {
    const atendimento = await Atendimento.findByPk(req.params.id);
    if (atendimento) {
      res.json(atendimento);
    } else {
      res.status(404).json({ error: 'Atendimento not found' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to fetch atendimento' });
  }
};

// Função para atualizar um atendimento por ID
export const updateAtendimento = async (req, res) => {
  try {
    const atendimento = await Atendimento.findByPk(req.params.id);
    if (atendimento) {
      const { data_saida, data_chegada, destino,data_devolucao, km_inicial, km_final, reserveID } = req.body;

      await atendimento.update({
        data_saida,
        data_chegada,
        data_devolucao,
        destino,
        km_inicial,
        km_final,
        reserveID
      });
      
      res.json(atendimento);
    } else {
      res.status(404).json({ error: 'Atendimento not found' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to update atendimento' });
  }
};

// Função para deletar um atendimento por ID
export const deleteAtendimento = async (req, res) => {
  try {
    const atendimento = await Atendimento.findByPk(req.params.id);
    if (atendimento) {
      await atendimento.destroy();
      res.json({ message: 'Atendimento deleted' });
    } else {
      res.status(404).json({ error: 'Atendimento not found' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to delete atendimento' });
  }
};
