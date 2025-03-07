import User from '../models/User.js';
import Role from '../models/Role.js';

// Função para buscar todos os usuários
export const getAllUsers = async (req, res) => {
  try {
    const users = await User.findAll();
    const response = users.map(user => {
      const imgBase64 = user.img ? user.img.toString('base64') : null; // Converte Buffer para Base64
      return {
        ...user.toJSON(),
        imgBase64: imgBase64, // Adiciona o campo imgBase64 à resposta
      };
    });
    res.json(response);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to fetch users' });
  }
};

// Função para adicionar um novo usuário
export const createUser = async (req, res) => {
  try {
    console.log('Requisição recebida no backend para criar usuário.');
    console.log('Dados recebidos no body:', req.body);

    const { username, firstName, lastName, gender, birthdate, email, address, neighborhood, phone1, phone2, password, img, state } = req.body;

    // Verificando se os campos obrigatórios estão preenchidos
    if (!username || !firstName || !lastName || !email || !password) {
      console.error('Erro: Campos obrigatórios ausentes.');
      return res.status(400).json({ error: 'Missing required fields' });
    }

    // Converte a imagem para Buffer se necessário
    let imgBuffer = null;
    if (img) {
      try {
        imgBuffer = Buffer.from(img, 'base64');
        console.log('Imagem convertida para Buffer com sucesso.');
      } catch (err) {
        console.error('Erro ao converter imagem para Buffer:', err);
        return res.status(400).json({ error: 'Invalid image format' });
      }
    }

    console.log('Criando usuário no banco de dados...');
    const user = await User.create({
      username,
      firstName,
      lastName,
      gender,
      birthdate,
      email,
      address,
      neighborhood,
      phone1,
      phone2,
      password,
      img: imgBuffer, // Armazena o Buffer da imagem
      state
    });

    console.log('Usuário criado no banco de dados:', user);

    // Inclua a imagem como Base64 na resposta para o Flutter
    const imgBase64 = user.img ? user.img.toString('base64') : null;
    user.img = imgBase64;

    res.status(201).json(user);
  } catch (error) {
    console.error('Erro ao criar usuário:', error);
    res.status(500).json({ error: 'Failed to create user' });
  }
};

// Função para buscar um usuário por ID
export const getUserById = async (req, res) => {
  try {
    const user = await User.findByPk(req.params.id);
    if (user) {
      // Inclua a imagem como uma URL base64
      if (user.img) {
        user.img = `data:image/jpeg;base64,${user.img.toString('base64')}`;
      }
      res.json(user);
    } else {
      res.status(404).json({ error: 'User not found' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to fetch user' });
  }
};

// Função para buscar um usuário por primeiro e último nome
export const getUserByFullName = async (req, res) => {
  try {
    const fullName = req.params.fullName;

    // Separar o nome completo em primeiro e último nome
    const [firstName, lastName] = fullName.split(' ');

    // Buscar o usuário pelo primeiro e último nome
    const user = await User.findOne({
      where: {
        firstName: firstName,
        lastName: lastName
      }
    });

    if (user) {
      // Incluir a imagem como uma URL base64 se existir
      if (user.img) {
        user.img = `data:image/jpeg;base64,${user.img.toString('base64')}`;
      }

      // Retornar todos os atributos do usuário
      res.json(user);
    } else {
      res.status(404).json({ error: 'User not found' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to fetch user' });
  }
};


// Função para atualizar um usuário por ID
export const updateUser = async (req, res) => {
  try {
    const user = await User.findByPk(req.params.id);
    if (user) {
      const { username, firstName, lastName, gender, birthdate, email, address, neighborhood, phone1, phone2, password, img, state } = req.body;
      
      // Converte a imagem para Buffer se necessário
      const imgBuffer = img ? Buffer.from(img, 'base64') : null;
      
      await user.update({
        username,
        firstName,
        lastName,
        gender,
        birthdate,
        email,
        address,
        neighborhood,
        phone1,
        phone2,
        password,
        img: imgBuffer, // Atualiza o Buffer da imagem
        state // Atualiza o estado do usuário
      });
      
      // Inclua a imagem como Base64 na resposta
      if (user.img) {
        user.img = `data:image/jpeg;base64,${user.img.toString('base64')}`;
      }
      
      res.json(user);
    } else {
      res.status(404).json({ error: 'User not found' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to update user' });
  }
};

// Função para deletar um usuário por ID
export const deleteUser = async (req, res) => {
  try {
    const user = await User.findByPk(req.params.id);
    if (user) {
      await user.destroy();
      res.json({ message: 'User deleted' });
    } else {
      res.status(404).json({ error: 'User not found' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to delete user' });
  }
};

// Função para autenticar usuário
export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({
      where: { email, password }
    });

    if (user) {
      // Inclua a imagem como Base64 na resposta
      const imgBase64 = user.img ? user.img.toString('base64') : null;
      const userResponse = {
        ...user.toJSON(),
        img: imgBase64,
      };

      res.json(userResponse);
    } else {
      res.status(401).json({ error: 'Invalid email or password' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
};