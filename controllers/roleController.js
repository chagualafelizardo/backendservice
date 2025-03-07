import Role from '../models/Role.js';

// Função para criar um novo papel
export const createRole = async (req, res) => {
    const { name } = req.body;
    try {
      const newRole = await Role.create({ name });
      res.status(201).json(newRole);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  };
  
  // Função para obter todos os papéis
  export const getAllRoles = async (req, res) => {
    try {
      const roles = await Role.findAll();
      res.status(200).json(roles);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  };
  
  // Função para obter um papel por ID
  export const getRoleById = async (req, res) => {
    const { id } = req.params;
    try {
      const role = await Role.findByPk(id);
      if (role) {
        res.status(200).json(role);
      } else {
        res.status(404).json({ message: 'Role not found' });
      }
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  };
  
  // Função para atualizar um papel
  export const updateRole = async (req, res) => {
    const { id } = req.params;
    const { name } = req.body;
    try {
      const role = await Role.findByPk(id);
      if (role) {
        role.name = name;
        await role.save();
        res.status(200).json(role);
      } else {
        res.status(404).json({ message: 'Role not found' });
      }
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  };
  
  // Função para deletar um papel
  export const deleteRole = async (req, res) => {
    const { id } = req.params;
    try {
      const role = await Role.findByPk(id);
      if (role) {
        await role.destroy();
        res.status(200).json({ message: 'Role deleted successfully' });
      } else {
        res.status(404).json({ message: 'Role not found' });
      }
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  };
  
  export const getUsersByRole = async (req, res) => {
    try {
      const { roleId } = req.params;
  
      // Verificar se o role existe
      const role = await Role.findByPk(roleId);
      if (!role) {
        return res.status(404).json({ message: 'Role not found' });
      }
  
      // Buscar usuários associados ao role
      const users = await role.getUsers({
        attributes: ['id', 'username', 'email', 'firstName', 'lastName'], // Personalize os campos retornados
      });
  
      res.status(200).json(users);
    } catch (error) {
      console.error('Error fetching users by role:', error);
      res.status(500).json({ message: 'An error occurred', error: error.message });
    }
  };

  export const getUsersByRoleName = async (req, res) => {
    try {
      const { roleName } = req.params;
  
      // Verificar se o role existe, insensível a maiúsculas/minúsculas
      const role = await Role.findOne({
        where: sequelize.where(
          sequelize.fn('LOWER', sequelize.col('name')),
          roleName.toLowerCase()
        ),
      });
  
      if (!role) {
        return res.status(404).json({ message: 'Role not found' });
      }
  
      // Buscar usuários associados ao role
      const users = await role.getUsers({
        attributes: ['id', 'username', 'email', 'firstName', 'lastName'],
      });
  
      res.status(200).json(users);
    } catch (error) {
      console.error('Error fetching users by role name:', error);
      res.status(500).json({ message: 'An error occurred', error: error.message });
    }
  };
  
  