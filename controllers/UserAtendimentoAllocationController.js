import UserAtendimentoAllocation from '../models/UserAtendimentoAllocation.js';
import User from '../models/User.js';
import Atendimento from '../models/Atendimento.js';
import Allocation from '../models/Allocation.js';

// Criar uma nova associação
export const createUserAtendimentoAllocation = async (req, res) => {
  try {
    const { userId, atendimentoId, allocationId } = req.body;

    const newAssociation = await UserAtendimentoAllocation.create({
      userId,
      atendimentoId,
      allocationId,
    });

    res.status(201).json({
      message: 'Association created successfully.',
      data: newAssociation,
    });
  } catch (error) {
    res.status(500).json({
      message: 'Error creating association.',
      error: error.message,
    });
  }
};

// Listar todas as associações
export const getAllUserAtendimentoAllocations = async (req, res) => {
  try {
    const associations = await UserAtendimentoAllocation.findAll();
    res.status(200).json({ data: associations });
  } catch (error) {
    res.status(500).json({
      message: 'Error fetching associations.',
      error: error.message,
    });
  }
};

// Obter uma associação pelo ID
export const getUserAtendimentoAllocationById = async (req, res) => {
  try {
    const { id } = req.params;

    const association = await UserAtendimentoAllocation.findByPk(id);

    if (!association) {
      return res.status(404).json({ message: 'Association not found.' });
    }

    res.status(200).json({ data: association });
  } catch (error) {
    res.status(500).json({
      message: 'Error fetching association.',
      error: error.message,
    });
  }
};

// Atualizar uma associação pelo ID
export const updateUserAtendimentoAllocation = async (req, res) => {
  try {
    const { id } = req.params;
    const { userId, atendimentoId, allocationId } = req.body;

    const association = await UserAtendimentoAllocation.findByPk(id);

    if (!association) {
      return res.status(404).json({ message: 'Association not found.' });
    }

    await association.update({
      userId,
      atendimentoId,
      allocationId,
    });

    res.status(200).json({
      message: 'Association updated successfully.',
      data: association,
    });
  } catch (error) {
    res.status(500).json({
      message: 'Error updating association.',
      error: error.message,
    });
  }
};

// Excluir uma associação pelo ID
export const deleteUserAtendimentoAllocation = async (req, res) => {
  try {
    const { id } = req.params;

    const association = await UserAtendimentoAllocation.findByPk(id);

    if (!association) {
      return res.status(404).json({ message: 'Association not found.' });
    }

    await association.destroy();

    res.status(200).json({
      message: 'Association deleted successfully.',
    });
  } catch (error) {
    res.status(500).json({
      message: 'Error deleting association.',
      error: error.message,
    });
  }
};

// export const getUsersByAtendimentoId = async (req, res) => {
//   try {
//     const { atendimentoId } = req.params;

//     const allocations = await UserAtendimentoAllocation.findAll({
//       where: { atendimentoId },
//       include: [
//         {
//           model: User,
//           attributes: ['id', 'firstName', 'lastName', 'email', 'phone1', 'phone2'],
//         },
//         {
//           model: Atendimento,
//           attributes: ['id', 'description', 'date'],
//         },
//       ],
//     });

//     if (allocations.length === 0) {
//       return res.status(404).json({ message: 'No users found for the given atendimentoId.' });
//     }

//     res.status(200).json({ data: allocations });
//   } catch (error) {
//     res.status(500).json({
//       message: 'Error fetching users for the given atendimentoId.',
//       error: error.message,
//     });
//   }
// };

export const getUsersByAtendimentoId = async (req, res) => {
  try {
    const { atendimentoId } = req.params;

    const allocations = await UserAtendimentoAllocation.findAll({
      where: { atendimentoId },
      include: [
        {
          model: User,
          attributes: { exclude: [] }, // Retorna todos os atributos do User
        },
        {
          model: Atendimento,
          attributes: { exclude: [] }, // Retorna todos os atributos do Atendimento
        },
        {
          model: Allocation, // Inclui a entidade Allocation
          attributes: { exclude: [] }, // Retorna todos os atributos do Allocation
        },
      ],
    });

    if (allocations.length === 0) {
      return res.status(404).json({ message: 'No users found for the given atendimentoId.' });
    }

    res.status(200).json({ data: allocations });
  } catch (error) {
    res.status(500).json({
      message: 'Error fetching users for the given atendimentoId.',
      error: error.message,
    });
  }
};

export const getUserIdByAtendimentoId = async (req, res) => {
  try {
    const { atendimentoId } = req.params;

    // Busca apenas o userId associado ao atendimentoId
    const allocations = await UserAtendimentoAllocation.findAll({
      where: { atendimentoId }, // Filtra pelo atendimentoId
      attributes: ['userId'], // Seleciona apenas o campo userId
    });

    // Verifica se há resultados
    if (allocations.length === 0) {
      return res.status(404).json({ message: 'No users found for the given atendimentoId.' });
    }

    // Extrai os userIds dos resultados
    const userIds = allocations.map((allocation) => allocation.userId);

    // Retorna os userIds
    res.status(200).json({ userIds });
  } catch (error) {
    res.status(500).json({
      message: 'Error fetching users for the given atendimentoId.',
      error: error.message,
    });
  }
};