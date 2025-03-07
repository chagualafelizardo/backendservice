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
    const roles = await UserRole.findAll({
      where: { userId: req.params.userId },
      include: [Role],
    });
    res.json(roles);
  } catch (error) {
    console.error(error); // Log do erro
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
