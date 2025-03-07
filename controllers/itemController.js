import Item from '../models/Item.js';

// Função para buscar todos os itens
export const getAllItems = async (req, res) => {
  try {
    const items = await Item.findAll();
    res.json(items);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to fetch items' });
  }
};

// Função para adicionar um novo item
export const createItem = async (req, res) => {
  try {
    const { item, obs } = req.body;
    
    const newItem = await Item.create({
      item,
      obs
    });

    res.status(201).json(newItem);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to create item' });
  }
};

// Função para buscar um item por ID
export const getItemById = async (req, res) => {
  try {
    const item = await Item.findByPk(req.params.id);
    if (item) {
      res.json(item);
    } else {
      res.status(404).json({ error: 'Item not found' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to fetch item' });
  }
};

// Função para atualizar um item por ID
export const updateItem = async (req, res) => {
  try {
    const item = await Item.findByPk(req.params.id);
    if (item) {
      const { item: itemName, obs } = req.body;
      
      await item.update({
        item: itemName,
        obs
      });

      res.json(item);
    } else {
      res.status(404).json({ error: 'Item not found' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to update item' });
  }
};

// Função para deletar um item por ID
export const deleteItem = async (req, res) => {
  try {
    const item = await Item.findByPk(req.params.id);
    if (item) {
      await item.destroy();
      res.json({ message: 'Item deleted' });
    } else {
      res.status(404).json({ error: 'Item not found' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to delete item' });
  }
};
