import AtendimentoItem from '../models/AtendimentoItem.js';

// Função para buscar todos os itens de atendimento
export const getAllAtendimentoItems = async (req, res) => {
  try {
    const atendimentoItems = await AtendimentoItem.findAll();
    res.json(atendimentoItems);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to fetch atendimento items' });
  }
};

// Função para adicionar um novo item de atendimento
// Criar novo item de atendimento
// Função para adicionar um novo item de atendimento
export const createAtendimentoItem = async (req, res) => {
  try {
    const { atendimentoID, itemDescription } = req.body;

    console.log('Dados recebidos do body:', req.body);

    // Verifica se os dados estão corretos antes de prosseguir
    if (!atendimentoID || !itemDescription) {
      console.error('Faltando atendimentoID ou itemDescription');
      return res.status(400).json({ error: 'Missing atendimentoID or itemDescription' });
    }

    const newAtendimentoItem = await AtendimentoItem.create({
      atendimentoID,
      itemDescription,
    });

    console.log('Atendimento item criado com sucesso:', newAtendimentoItem);
    res.status(201).json(newAtendimentoItem);
  } catch (error) {
    console.error('Erro ao criar atendimento item:', error.message);
    res.status(500).json({ error: 'Failed to create atendimento item' });
  }
};

// Buscar todos os itens de atendimento por atendimentoID
export const getAtendimentoItems = async (req, res) => {
  try {
    const { atendimentoID } = req.params;
    const items = await AtendimentoItem.findAll({ where: { atendimentoID } });
    res.json(items);
  } catch (error) {
    console.error('Erro ao buscar itens:', error);
    res.status(500).json({ error: 'Failed to fetch atendimento items' });
  }
};


// Função para buscar um item de atendimento por ID
export const getAtendimentoItemById = async (req, res) => {
  try {
    const atendimentoItem = await AtendimentoItem.findByPk(req.params.id);
    if (atendimentoItem) {
      res.json(atendimentoItem);
    } else {
      res.status(404).json({ error: 'Atendimento item not found' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to fetch atendimento item' });
  }
};

// Função para atualizar um item de atendimento por ID
export const updateAtendimentoItem = async (req, res) => {
  try {
    const atendimentoItem = await AtendimentoItem.findByPk(req.params.id);
    if (atendimentoItem) {
      const { itemDescription, atendimentoID } = req.body;
      
      await atendimentoItem.update({
        itemDescription,
        atendimentoID
      });

      res.json(atendimentoItem);
    } else {
      res.status(404).json({ error: 'Atendimento item not found' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to update atendimento item' });
  }
};

// Função para deletar um item de atendimento por ID
export const deleteAtendimentoItem = async (req, res) => {
  try {
    const atendimentoItem = await AtendimentoItem.findByPk(req.params.id);
    if (atendimentoItem) {
      await atendimentoItem.destroy();
      res.json({ message: 'Atendimento item deleted' });
    } else {
      res.status(404).json({ error: 'Atendimento item not found' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to delete atendimento item' });
  }
};

// Buscar todos os itens de um atendimento específico
export const getItemsByAtendimento = async (req, res) => {
  try {
      const { atendimentoId } = req.params;
      
      const items = await AtendimentoItem.findAll({
          where: { atendimentoID: atendimentoId }
      });

      res.json(items);
  } catch (error) {
      console.error('Erro ao buscar itens do atendimento:', error);
      res.status(500).json({ error: 'Erro ao buscar itens do atendimento' });
  }
};