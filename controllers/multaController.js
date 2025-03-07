import MultaRepository from "../models/multaModel.js";

function findAll(req, res) {
  MultaRepository.findAll().then((result) => res.json(result));
}

function findMulta(req, res) {
  MultaRepository.findByPk(req.params.id).then((result) => res.json(result));
}

async function addMulta(req, res) {
      await MultaRepository.create(
        {
          // nome: req.body.nome,
          // login: req.body.login,
          // senha: req.body.senha,
          // telefone: req.body.telefone,
          // email: req.body.email
        }
    );
}

async function updateMulta(req, res) {
  await MultaRepository.update(
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

  MultaRepository.findByPk(req.params.id).then((result) => res.json(result));
}

async function deleteMulta(req, res) {
  await MultaRepository.destroy({
    where: {
      id: req.params.id,
    },
  });

  MultaRepository.findAll().then((result) => res.json(result));
}

export default { findAll, addMulta, findMulta, updateMulta, deleteMulta };
