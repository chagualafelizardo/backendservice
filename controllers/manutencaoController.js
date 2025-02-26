import ManutencaoRepository from "../models/manutencaoModel.js";

function findAll(req, res) {
  ManutencaoRepository.findAll().then((result) => res.json(result));
}

function findManutencao(req, res) {
  ManutencaoRepository.findByPk(req.params.id).then((result) => res.json(result));
}

async function addManutencao(req, res) {
      await ManutencaoRepository.create(
        {
          // nome: req.body.nome,
          // login: req.body.login,
          // senha: req.body.senha,
          // telefone: req.body.telefone,
          // email: req.body.email
        }
    );
}

async function updateManutencao(req, res) {
  await ManutencaoRepository.update(
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

  ManutencaoRepository.findByPk(req.params.id).then((result) => res.json(result));
}

async function deleteManutencao(req, res) {
  await ManutencaoRepository.destroy({
    where: {
      id: req.params.id,
    },
  });

  ManutencaoRepository.findAll().then((result) => res.json(result));
}

export default { findAll, addManutencao, findManutencao, updateManutencao, deleteManutencao };
