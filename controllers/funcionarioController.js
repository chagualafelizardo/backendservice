import FuncionarioRepository from "../models/funcionarioModel.js";

function findAll(req, res) {
  FuncionarioRepository.findAll().then((result) => res.json(result));
}

function findFuncionario(req, res) {
  FuncionarioRepository.findByPk(req.params.id).then((result) => res.json(result));
}

async function addFuncionario(req, res) {
      await FuncionarioRepository.create(
        {
          // nome: req.body.nome,
          // login: req.body.login,
          // senha: req.body.senha,
          // telefone: req.body.telefone,
          // email: req.body.email
        }
    );
}

async function updateFuncionario(req, res) {
  await FuncionarioRepository.update(
    {
        // nome: req.body.nome,
        // login: req.body.login,
        // senha: req.body.senha,
        // telefone: req.body.telefone,
        // email: req.body.email
    },
    {
      where: {
        id: req.params.id,
      },
    }
  );

  FuncionarioRepository.findByPk(req.params.id).then((result) => res.json(result));
}

async function deleteFuncionario(req, res) {
  await FuncionarioRepository.destroy({
    where: {
      id: req.params.id,
    },
  });

  FuncionarioRepository.findAll().then((result) => res.json(result));
}

export default { findAll, addFuncionario, findFuncionario, updateFuncionario, deleteFuncionario };
