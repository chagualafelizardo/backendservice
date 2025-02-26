import DetalhesManutencaoRepository from "../models/detalhesmanutencaoModel.js";

function findAll(req, res) {
  DetalhesManutencaoRepository.findAll().then((result) => res.json(result));
}

function findDetalhesManutencao(req, res) {
  DetalhesManutencaoRepository.findByPk(req.params.id).then((result) => res.json(result));
}

async function addDetalhesManutencao(req, res) {
      await DetalhesManutencaoRepository.create(
        {
          // nome: req.body.nome,
          // login: req.body.login,
          // senha: req.body.senha,
          // telefone: req.body.telefone,
          // email: req.body.email
        }
    );
}

async function updateDetalhesManutencao(req, res) {
  await DetalhesManutencaoRepository.update(
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

  DetalhesManutencaoRepository.findByPk(req.params.id).then((result) => res.json(result));
}

async function deleteDetalhesManutencao(req, res) {
  await DetalhesManutencaoRepository.destroy({
    where: {
      id: req.params.id,
    },
  });

  DetalhesManutencaoRepository.findAll().then((result) => res.json(result));
}

export default { findAll, addDetalhesManutencao, findDetalhesManutencao, updateDetalhesManutencao, deleteDetalhesManutencao };
