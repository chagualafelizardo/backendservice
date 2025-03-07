import AbastecimentoRepository from "../models/abastecimentoModel.js";

function findAll(req, res) {
  AbastecimentoRepository.findAll().then((result) => res.json(result));
}

function findAbastecimento(req, res) {
  AbastecimentoRepository.findByPk(req.params.id).then((result) => res.json(result));
}

async function addAbastecimento(req, res) {
      await AbastecimentoRepository.create(
        {
          // nome: req.body.nome,
          // login: req.body.login,
          // senha: req.body.senha,
          // telefone: req.body.telefone,
          // email: req.body.email
        }
    );
}

async function updateAbastecimento(req, res) {
  await AbastecimentoRepository.update(
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

  AbastecimentoRepository.findByPk(req.params.id).then((result) => res.json(result));
}

async function deleteAbastecimento(req, res) {
  await AbastecimentoRepository.destroy({
    where: {
      id: req.params.id,
    },
  });

  AbastecimentoRepository.findAll().then((result) => res.json(result));
}

export default { findAll, addAbastecimento, findAbastecimento, updateAbastecimento, deleteAbastecimento };
