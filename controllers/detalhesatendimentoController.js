import DetalhesAtendimentoRepository from "../models/detalhesatendimentoModel.js";

function findAll(req, res) {
  DetalhesAtendimentoRepository.findAll().then((result) => res.json(result));
}

function findDetalhesAtendimento(req, res) {
  DetalhesAtendimentoRepository.findByPk(req.params.id).then((result) => res.json(result));
}

async function addDetalhesAtendimento(req, res) {
      await DetalhesAtendimentoRepository.create(
        {
          // nome: req.body.nome,
          // login: req.body.login,
          // senha: req.body.senha,
          // telefone: req.body.telefone,
          // email: req.body.email
        }
    );
}

async function updateDetalhesAtendimento(req, res) {
  await DetalhesAtendimentoRepository.update(
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

  DetalhesAtendimentoRepository.findByPk(req.params.id).then((result) => res.json(result));
}

async function deleteDetalhesAtendimento(req, res) {
  await DetalhesAtendimentoRepository.destroy({
    where: {
      id: req.params.id,
    },
  });

  DetalhesAtendimentoRepository.findAll().then((result) => res.json(result));
}

export default { findAll, addDetalhesAtendimento, findDetalhesAtendimento, updateDetalhesAtendimento, deleteDetalhesAtendimento };
