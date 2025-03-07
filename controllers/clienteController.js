import ClienteRepository from "../models/clienteModel.js";

function findAll(req, res) {
  ClienteRepository.findAll().then((result) => res.json(result));
}

function findCliente(req, res) {
  ClienteRepository.findByPk(req.params.id).then((result) => res.json(result));
}

async function addCliente(req, res) {
      await ClienteRepository.create(
        {
          // nome: req.body.nome,
          // login: req.body.login,
          // senha: req.body.senha,
          // telefone: req.body.telefone,
          // email: req.body.email
        }
    );
}

async function updateCliente(req, res) {
  await ClienteRepository.update(
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

  ClienteRepository.findByPk(req.params.id).then((result) => res.json(result));
}

async function deleteCliente(req, res) {
  await ClienteRepository.destroy({
    where: {
      id: req.params.id,
    },
  });

  ClienteRepository.findAll().then((result) => res.json(result));
}

export default { findAll, addCliente, findCliente, updateCliente, deleteCliente };
