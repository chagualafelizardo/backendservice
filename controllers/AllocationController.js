import Allocation from '../models/Allocation.js';
import UserAtendimentoAllocation from '../models/UserAtendimentoAllocation.js';
import User from '../models/User.js';
import Atendimento from '../models/Atendimento.js';
import Reserva from '../models/Reserva.js';
import Veiculo from '../models/Veiculo.js';

// Função para buscar todas as alocações
export const getAllAllocations = async (req, res) => {
  try {
    const allocations = await Allocation.findAll();
    res.json(allocations);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to fetch allocations' });
  }
};

// Função para buscar uma alocação por ID
export const getAllocationById = async (req, res) => {
  try {
    const allocation = await Allocation.findByPk(req.params.id);
    if (allocation) {
      res.json(allocation);
    } else {
      res.status(404).json({ error: 'Allocation not found' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to fetch allocation' });
  }
};

// Função para criar uma nova alocação
export const createAllocation = async (req, res) => {
  try {
    const {startDate, endDate, destination, paid } = req.body;

    const allocation = await Allocation.create({
      startDate,
      endDate,
      destination,
      paid,
    });

    res.status(201).json(allocation);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to create allocation' });
  }
};

// Função para atualizar uma alocação por ID
export const updateAllocation = async (req, res) => {
  try {
    const allocation = await Allocation.findByPk(req.params.id);
    if (allocation) {
      const {startDate, endDate, destination, paid } = req.body;

      await allocation.update({
        startDate,
        endDate,
        destination,
        paid,
      });

      res.json(allocation);
    } else {
      res.status(404).json({ error: 'Allocation not found' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to update allocation' });
  }
};

// Função para deletar uma alocação por ID
export const deleteAllocation = async (req, res) => {
  try {
    const allocation = await Allocation.findByPk(req.params.id);
    if (allocation) {
      await allocation.destroy();
      res.json({ message: 'Allocation deleted' });
    } else {
      res.status(404).json({ error: 'Allocation not found' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to delete allocation' });
  }
};

export const getAllocationDetailsById = async (req, res) => {
  try {
    const { allocationId } = req.params;

    if (!allocationId || isNaN(Number(allocationId))) {
      return res.status(400).json({
        success: false,
        message: 'ID de alocação inválido'
      });
    }

    const allocation = await Allocation.findByPk(allocationId, {
      include: [{
        model: UserAtendimentoAllocation,
        as: 'userAtendimentoAllocations', // Deve bater com o alias na associação
        include: [
          {
            model: User,
            as: 'User', // Alias para User
            attributes: ['id', 'firstName', 'lastName', 'email', 'phone1', 'phone2', 'img']
          },
          {
            model: Atendimento,
            as: 'Atendimento', // Alias para Atendimento
            include: [{
              model: Reserva,
              as: 'Reserva', // Verifique o alias usado na associação
              include: [{
                model: Veiculo,
                as: 'Veiculo' // Verifique o alias usado na associação
              }]
            }]
          }
        ]
      }]
    });

    if (!allocation) {
      return res.status(404).json({
        success: false,
        message: 'Alocação não encontrada'
      });
    }

    // Formatar a resposta
    const response = {
      alocacao: {
        id: allocation.id,
        dataInicio: allocation.startDate,
        dataFim: allocation.endDate,
        destino: allocation.destination,
        pago: allocation.paid
      },
      motoristas: allocation.userAtendimentoAllocations?.map(ua => ({
        id: ua.User?.id,
        nome: `${ua.User?.firstName} ${ua.User?.lastName}`,
        email: ua.User?.email,
        telefone: ua.User?.phone1,
        imagem: ua.User?.img ? ua.User.img.toString('base64') : null
      })) || [],
      atendimentos: allocation.userAtendimentoAllocations?.map(ua => ({
        id: ua.Atendimento?.id,
        destino: ua.Atendimento?.destino,
        dataSaida: ua.Atendimento?.dataSaida,
        dataChegada: ua.Atendimento?.dataChegada,
        veiculo: ua.Atendimento?.Reserva?.Veiculo ? {
          matricula: ua.Atendimento.Reserva.Veiculo.matricula,
          marca: ua.Atendimento.Reserva.Veiculo.marca,
          modelo: ua.Atendimento.Reserva.Veiculo.modelo
        } : null
      })) || []
    };

    res.status(200).json({
      sucesso: true,
      dados: response
    });

  } catch (error) {
    console.error('Erro ao buscar detalhes da alocação:', error);
    res.status(500).json({
      sucesso: false,
      mensagem: 'Erro no servidor',
      erro: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
};
