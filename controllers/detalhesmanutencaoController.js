import DetalhesManutencao from '../models/DetalhesManutencao.js';

// Função para buscar todos os detalhes de manutenção
export const findAllDetalhesManutencao = async (req, res) => {
  try {
    const detalhes = await DetalhesManutencao.findAll();
    res.json(detalhes);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to fetch detalhes de manutenção' });
  }
};

// Função para adicionar um novo detalhe de manutenção
export const addDetalheManutencao = async (req, res) => {
  const { item, obs, manutencaoID } = req.body;

  // Validação dos campos obrigatórios
  if (!item || !manutencaoID) {
    return res.status(400).json({ error: 'item and manutencaoID are required' });
  }

  try {
    const detalhe = await DetalhesManutencao.create({
      item,
      obs,
      manutencaoID,
    });
    res.status(201).json(detalhe);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to create detalhe de manutenção' });
  }
};

// Função para buscar um detalhe de manutenção por ID
export const getDetalheManutencaoById = async (req, res) => {
  try {
    const detalhe = await DetalhesManutencao.findByPk(req.params.id);
    if (detalhe) {
      res.json(detalhe);
    } else {
      res.status(404).json({ error: 'Detalhe de manutenção not found' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to fetch detalhe de manutenção' });
  }
};

// Função para atualizar um detalhe de manutenção por ID
export const updateDetalheManutencao = async (req, res) => {
  try {
    const detalhe = await DetalhesManutencao.findByPk(req.params.id);
    if (detalhe) {
      const { item, obs, manutencaoID } = req.body;

      await detalhe.update({
        item,
        obs,
        manutencaoID,
      });

      res.json(detalhe);
    } else {
      res.status(404).json({ error: 'Detalhe de manutenção not found' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to update detalhe de manutenção' });
  }
};

// Função para deletar um detalhe de manutenção por ID
export const deleteDetalheManutencao = async (req, res) => {
  try {
    const detalhe = await DetalhesManutencao.findByPk(req.params.id);
    if (detalhe) {
      await detalhe.destroy();
      res.json({ message: 'Detalhe de manutenção deleted' });
    } else {
      res.status(404).json({ error: 'Detalhe de manutenção not found' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to delete detalhe de manutenção' });
  }
}; 