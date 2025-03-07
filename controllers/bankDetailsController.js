import BankDetails from '../models/BankDetails.js';
import User from '../models/User.js';

// Função para buscar todos os detalhes bancários
export const getAllBankDetails = async (req, res) => {
  try {
    const bankDetails = await BankDetails.findAll({ include: User });
    res.json(bankDetails);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to fetch bank details' });
  }
};

// Função para adicionar novos detalhes bancários
export const createBankDetails = async (req, res) => {
  try {
    const { userId, bankName, accountNumber, accountType, mpesaAccountNumber, eMolaAccountNumber } = req.body;

    const bankDetails = await BankDetails.create({
      userId,
      bankName,
      accountNumber,
      accountType,
      mpesaAccountNumber,
      eMolaAccountNumber,
    });

    res.status(201).json(bankDetails);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to create bank details' });
  }
};

// Função para buscar detalhes bancários por ID
export const getBankDetailsById = async (req, res) => {
  try {
    const bankDetails = await BankDetails.findByPk(req.params.id, { include: User });
    if (bankDetails) {
      res.json(bankDetails);
    } else {
      res.status(404).json({ error: 'Bank details not found' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to fetch bank details' });
  }
};

// Função para atualizar detalhes bancários por ID
export const updateBankDetails = async (req, res) => {
  try {
    const bankDetails = await BankDetails.findByPk(req.params.id);
    if (bankDetails) {
      const { bankName, accountNumber, accountType, mpesaAccountNumber, eMolaAccountNumber } = req.body;

      await bankDetails.update({
        bankName,
        accountNumber,
        accountType,
        mpesaAccountNumber,
        eMolaAccountNumber,
      });

      res.json(bankDetails);
    } else {
      res.status(404).json({ error: 'Bank details not found' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to update bank details' });
  }
};

// Função para deletar detalhes bancários por ID
export const deleteBankDetails = async (req, res) => {
  try {
    const bankDetails = await BankDetails.findByPk(req.params.id);
    if (bankDetails) {
      await bankDetails.destroy();
      res.json({ message: 'Bank details deleted' });
    } else {
      res.status(404).json({ error: 'Bank details not found' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to delete bank details' });
  }
};

export const getBankDetailsByUser = async (req, res) => {
  try {
    const { userID } = req.params;
    const bankDetails = await BankDetails.findAll({ where: { userId: userID } });

    res.status(200).json(bankDetails);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to fetch bank details' });
  }
};
