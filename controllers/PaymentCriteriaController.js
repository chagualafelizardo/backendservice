import PaymentCriteria from '../models/PaymentCriteria.js';

// Criar um novo critério de pagamento
export const createPaymentCriteria = async (req, res) => {
  try {
    const { activity, paymentType, paymentMethod, paymentPeriod, amount } = req.body;

    const newCriteria = await PaymentCriteria.create({
      activity,
      paymentType,
      paymentMethod,
      paymentPeriod,
      amount,
    });

    res.status(201).json({ message: 'Payment criteria created successfully.', data: newCriteria });
  } catch (error) {
    res.status(500).json({ message: 'Error creating payment criteria.', error: error.message });
  }
};

// Listar todos os critérios de pagamento
export const getAllPaymentCriteria = async (req, res) => {
  try {
    const criteria = await PaymentCriteria.findAll();
    res.status(200).json({ data: criteria });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching payment criteria.', error: error.message });
  }
};

// Obter um critério de pagamento pelo ID
export const getPaymentCriteriaById = async (req, res) => {
  try {
    const { id } = req.params;

    const criteria = await PaymentCriteria.findByPk(id);

    if (!criteria) {
      return res.status(404).json({ message: 'Payment criteria not found.' });
    }

    res.status(200).json({ data: criteria });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching payment criteria.', error: error.message });
  }
};

// Atualizar um critério de pagamento pelo ID
export const updatePaymentCriteria = async (req, res) => {
  try {
    const { id } = req.params;
    const { activity, paymentType, paymentMethod, paymentPeriod, amount } = req.body;

    const criteria = await PaymentCriteria.findByPk(id);

    if (!criteria) {
      return res.status(404).json({ message: 'Payment criteria not found.' });
    }

    await criteria.update({ activity, paymentType, paymentMethod, paymentPeriod, amount });

    res.status(200).json({ message: 'Payment criteria updated successfully.', data: criteria });
  } catch (error) {
    res.status(500).json({ message: 'Error updating payment criteria.', error: error.message });
  }
};

// Excluir um critério de pagamento pelo ID
export const deletePaymentCriteria = async (req, res) => {
  try {
    const { id } = req.params;

    const criteria = await PaymentCriteria.findByPk(id);

    if (!criteria) {
      return res.status(404).json({ message: 'Payment criteria not found.' });
    }

    await criteria.destroy();

    res.status(200).json({ message: 'Payment criteria deleted successfully.' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting payment criteria.', error: error.message });
  }
};
