const db = require("../models");
const Utilisateur = db.utilisateur;


exports.create = (req, res) => {
  const utilisateur = new Utilisateur(req.body);
  utilisateur
    .save(utilisateur)
    .then(data => {
      res.status(200).send({"data":data});
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Une erreur est survenue lors de la création de l'utilisateur."
      });
    });
};

//lister toutes les données
exports.findAll = (req, res) => {
  if (!req.header('authorization')) {
    res.status(400).send({ message: "Page introuvable!" });
    return;
  }
  Utilisateur.find({})
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Une erreur est survenue lors de la récupération des utilisateurs."
      });
    });
};

// Chercher un utilisateur avec un id
exports.findOne = (req, res) => {
  const id = req.params.id;
  if (!req.header('authorization')) {
    res.status(400).send({ message: "Page introuvable!" });
    return;
  }
  Utilisateur.findById(id)
    .then(data => {
      if (!data)
        res.status(404).send({ message: "Utilisateur ayant id " + id +" est introuvable"});
      else res.send(data);
    })
    .catch(err => {
      res
        .status(500)
        .send({ message: "Erreur de récupération de l'utilisateur ayant id=" + id });
    });
};

// Modifier un utilisateur
exports.update = (req, res) => {
  if (!req.body) {
    return res.status(400).send({
      message: "Les données de modification sont obligatoire!"
    });
  }
  if (!req.header('authorization')) {
    res.status(400).send({ message: "Page introuvable!" });
    return;
  }
  const id = req.params.id;
  Utilisateur.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
    .then(data => {
      if (!data) {
        res.status(404).send({
          message: "Ne peut pas modifier l'utilisateur ayant id=${id}. Peut-être l'utilisateur est introuvable!"
        });
      } else res.send({ message: "L'utilisateur est modifié" });
    })
    .catch(err => {
      res.status(500).send({
        message: "Erreur de modifié l'utilisateur ayant id=" + id
      });
    });
};
// Supprimer un utilisateur
exports.delete = (req, res) => {
  const id = req.params.id;
  if (!req.header('authorization')) {
    res.status(400).send({ message: "Page introuvable!" });
    return;
  }
  Utilisateur.findByIdAndRemove(id, { useFindAndModify: false })
    .then(data => {
      if (!data) {
        res.status(404).send({
          message: "Ne peut pas supprimer l'utilisateur ayant id=${id}. Peut être l'utilisateur n'existe pas!"
        });
      } else {
        res.send({
          message: "L'utilisateur est supprimé!"
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Erreur de suppression de l'utilisateur ayant id=" + id
      });
    });
};

// Supprimer tous les utilisateurs
exports.deleteAll = (req, res) => {
  if (!req.header('authorization')) {
    res.status(400).send({ message: "Page introuvable!" });
    return;
  }
  Utilisateur.deleteMany({})
    .then(data => {
      res.send({
        message: `${data.deletedCount} utilisateurs sont supprimés!`
      });
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Une erreur est survenue lors de la suppression de tous les utilisateurs"
      });
    });
};
