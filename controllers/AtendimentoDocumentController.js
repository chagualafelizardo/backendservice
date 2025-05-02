import AtendimentoDocument from '../models/AtendimentoDocument.js';

// Função para buscar todos os documentos de atendimento
export const getAllAtendimentoDocuments = async (req, res) => {
  try {
    const atendimentoDocuments = await AtendimentoDocument.findAll();
    res.json(atendimentoDocuments);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to fetch atendimento documents' });
  }
};

// Função para adicionar um novo documento de atendimento
export const createAtendimentoDocument = async (req, res) => {
  try {
    const { itemDescription, atendimentoID, image } = req.body;

    const newAtendimentoDocument = await AtendimentoDocument.create({
      itemDescription,
      atendimentoID,
      image // Adiciona a imagem ao novo documento
    });

    res.status(201).json(newAtendimentoDocument);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to create atendimento document' });
  }
};

// Função para buscar um documento de atendimento por ID
export const getAtendimentoDocumentById = async (req, res) => {
  try {
    const atendimentoDocument = await AtendimentoDocument.findByPk(req.params.id);
    if (atendimentoDocument) {
      res.json(atendimentoDocument);
    } else {
      res.status(404).json({ error: 'Atendimento document not found' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to fetch atendimento document' });
  }
};

// Função para atualizar um documento de atendimento por ID
export const updateAtendimentoDocument = async (req, res) => {
  try {
    const atendimentoDocument = await AtendimentoDocument.findByPk(req.params.id);
    if (atendimentoDocument) {
      const { itemDescription, atendimentoID, image } = req.body;
      
      await atendimentoDocument.update({
        itemDescription,
        atendimentoID,
        image // Atualiza a imagem se fornecida
      });

      res.json(atendimentoDocument);
    } else {
      res.status(404).json({ error: 'Atendimento document not found' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to update atendimento document' });
  }
};

// Função para deletar um documento de atendimento por ID
export const deleteAtendimentoDocument = async (req, res) => {
  try {
    const atendimentoDocument = await AtendimentoDocument.findByPk(req.params.id);
    if (atendimentoDocument) {
      await atendimentoDocument.destroy();
      res.json({ message: 'Atendimento document deleted' });
    } else {
      res.status(404).json({ error: 'Atendimento document not found' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to delete atendimento document' });
  }
};

// Buscar todos os documentos de um atendimento específico
export const getDocumentsByAtendimento = async (req, res) => {
  try {
      const { atendimentoId } = req.params;
      
      const documents = await AtendimentoDocument.findAll({
          where: { atendimentoID: atendimentoId }
      });

      res.json(documents);
  } catch (error) {
      console.error('Erro ao buscar documentos do atendimento:', error);
      res.status(500).json({ error: 'Erro ao buscar documentos do atendimento' });
  }
};