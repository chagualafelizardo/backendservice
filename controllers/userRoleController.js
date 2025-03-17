import UserRole from '../models/UserRole.js';
import User from '../models/User.js';
import Role from '../models/Role.js';

export const assignRoleToUser = async (req, res) => {
  try {
    const { userId, roleId } = req.body;

    // Verifica se o usuário e o papel existem
    const user = await User.findByPk(userId);
    const role = await Role.findByPk(roleId);
    
    if (!user) {
      console.error('User not found');
      return res.status(404).json({ error: 'User not found' });
    }
    
    if (!role) {
      console.error('Role not found');
      return res.status(404).json({ error: 'Role not found' });
    }

    const userRole = await UserRole.create({ userId, roleId });
    res.status(201).json(userRole);
  } catch (error) {
    console.error(error); // Log do erro
    res.status(500).json({ error: 'Failed to assign role to user' });
  }
};

export const getRolesByUserId = async (req, res) => {
  try {
    const user = await User.findOne({
      where: { id: req.params.userId }, // Filtra pelo ID do usuário
      include: [
        {
          model: Role, // Inclui o modelo Role
          through: { attributes: [] }, // Não inclui atributos da tabela intermediária
          attributes: ['id', 'name'], // Seleciona apenas os campos necessários
        },
      ],
    });

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Retorna os dados do usuário e suas roles
    const response = {
      id: user.id,
      username: user.username,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      roles: user.roles, // Inclui as roles associadas ao usuário
    };

    res.json(response);
  } catch (error) {
    console.error('Erro ao buscar roles:', error); // Log do erro
    res.status(500).json({ error: 'Failed to fetch roles for user' });
  }
};

export const getUsersByRoleId = async (req, res) => {
  const { roleId } = req.params; // Obtendo o roleId dos parâmetros da requisição

  try {
    const users = await UserRole.findAll({
      where: { roleId }, // Filtrando pelo roleId
      include: [
        {
          model: User,
          required: true,
        },
        {
          model: Role,
          required: true,
        },
      ],
    });

    return res.json(users);
  } catch (error) {
    console.error('Erro ao buscar usuários por roleId:', error);
    return res.status(500).json({ error: 'Erro ao buscar usuários.' });
  }
};

export const getAllUsersWithRoles = async (req, res) => {
  try {
    const users = await User.findAll({
      include: [
        {
          model: Role,
          through: { attributes: [] }, // Não inclui atributos da tabela intermediária
          attributes: ['id', 'name'], // Seleciona apenas os campos necessários
        },
      ],
    });

    if (!users.length) {
      return res.status(404).json({ error: 'No users found' });
    }

    // Mapeia os usuários para incluir suas roles
    const response = users.map(user => ({
      id: user.id,
      username: user.username,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      roles: user.roles, // Inclui as roles associadas ao usuário
    }));

    res.json(response);
  } catch (error) {
    console.error('Erro ao buscar usuários com roles:', error);
    res.status(500).json({ error: 'Failed to fetch users with roles' });
  }
};

export const getAllDrivers = async (req, res) => {
  try {
    const drivers = await User.findAll({
      include: [
        {
          model: Role,
          through: { attributes: [] },
          attributes: ['id', 'name'],
          where: { name: 'Motorista' }, // Filtra apenas usuários com a role 'DRIVER'
        },
      ],
    });

    if (!drivers.length) {
      return res.status(404).json({ error: 'No drivers found' });
    }

    // Mapeia os usuários para incluir suas roles
    const response = drivers.map(user => ({
      id: user.id,
      username: user.username,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      roles: user.roles,
    }));

    res.json(response);
  } catch (error) {
    console.error('Erro ao buscar motoristas:', error);
    res.status(500).json({ error: 'Failed to fetch drivers' });
  }
};

export const getAllClients = async (req, res) => {
  try {
    const drivers = await User.findAll({
      include: [
        {
          model: Role,
          through: { attributes: [] },
          attributes: ['id', 'name'],
          where: { name: 'Client' }, // Filtra apenas usuários com a role 'DRIVER'
        },
      ],
    });

    if (!drivers.length) {
      return res.status(404).json({ error: 'No drivers found' });
    }

    // Mapeia os usuários para incluir suas roles
    const response = drivers.map(user => ({
      id: user.id,
      username: user.username,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      roles: user.roles,
    }));

    res.json(response);
  } catch (error) {
    console.error('Erro ao buscar motoristas:', error);
    res.status(500).json({ error: 'Failed to fetch drivers' });
  }
};

