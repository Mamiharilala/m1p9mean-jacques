const db = require("../models");
//Authentification
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
const Utilisateur = db.utilisateur;
const Profil = db.profil;
const paramClient = "client";
var utilisateurService = require('../services/utilisateur.service');
// get config vars
dotenv.config();
// access config var
process.env.TOKEN_SECRET;

function generateAccessToken(username) {
  return jwt.sign(username, process.env.TOKEN_SECRET, { expiresIn: '1800s' });
}
exports.authenticateToken = (req, res, next) => {
  try {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    //if (token == null) return   res.status(401).send({  });
    //ici la verification du token
    console.log("Hell0");
    //if (err) return res.status(403).send({  });
    next();
  }
  catch (error) {
    next(error)
  }
  next();
}

exports.createClient = async function (req, res) {
  const utilisateur = new Utilisateur(req.body);
  utilisateur.token = generateAccessToken({ username: req.body.prenom });
  try {
    await utilisateurService.createClient(utilisateur);
    res.status(200).send({ data: { token: utilisateur.token }, message: "Client enregistré" });
  } catch (error) {
    res.status(500).send({ data: {}, message: "Client non enregistré" });
  }
};

//lister tous les utilisateurs
exports.findAll = async function (req, res) {
  let profil = await utilisateurService.getProfil();
  res.status(200).send({ data: profil });
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
        res.status(404).send({ message: "Utilisateur ayant id " + id + " est introuvable" });
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
