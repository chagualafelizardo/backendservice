import ItensEntrega from '../models/ItensEntrega.js'; // Usando o nome correto do modelo

// Função para buscar todos os itens
// export const getAllItensEntrega = async (req, res) => {
//   try {
//     const itensEntrega = await ItensEntrega.findAll();
//     res.json(itensEntrega);
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ error: 'Failed to fetch items' });
//   }
// };

export const getAllItensEntrega = async (req, res) => {
  try {
    const itensEntrega = await ItensEntrega.findAll();
    if (!Array.isArray(itensEntrega)) {
      return res.status(500).json({ success: false, error: 'Dados inválidos' });
    }
    res.json({ success: true, data: itensEntrega });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, error: 'Falha ao buscar itens de entrega' });
  }
};

// Função para adicionar um novo item
export const createItensEntrega = async (req, res) => {
  try {
    const { item, obs } = req.body;

    if (!item) {
      return res.status(400).json({ error: 'Item is required' });
    }

    const newItem = await ItensEntrega.create({
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
export const getItensEntregaById = async (req, res) => {
  try {
    const item = await ItensEntrega.findByPk(req.params.id);
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
export const updateItensEntrega = async (req, res) => {
  try {
    const item = await ItensEntrega.findByPk(req.params.id);
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
export const deleteItensEntrega = async (req, res) => {
  try {
    const item = await ItensEntrega.findByPk(req.params.id);
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
