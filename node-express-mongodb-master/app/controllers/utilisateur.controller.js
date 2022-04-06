const db = require("../models");
const sha1 = require('sha1');
//Authentification
const Utilisateur = db.utilisateur;
var utilisateurService = require('../services/utilisateur.service');
exports.authenticateToken = (req, res, next) => {
  try {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    //if (token == null) return   res.status(401).send({  });
    //ici la verification du token
    //if (err) return res.status(403).send({  });
    next();
  }
  catch (error) {
    next(error)
  }
  next();
}

exports.createClient = async function (req, res) {
  if (!req.body) {
    return res.status(400).send({
      message: "Les données d'inscription sont obligatoire!"
    });
  }
  const utilisateur = new Utilisateur(req.body);
  utilisateur.mot_passe = sha1(utilisateur.mot_passe); 
  utilisateur.token =sha1(Date.now());
  try {
    await utilisateurService.createClient(utilisateur);
    res.status(200).send({ data: { token: utilisateur.token }, message: "Client enregistré" });
  } catch (error) {
    res.status(500).send({ data: {}, message: "Client non enregistré" });
  }
};

exports.login =  async function(req, res) {
  if (!req.body) {
    return res.status(400).send({
      message: "Les données d'authentification sont obligatoire!"
    });
  }
  const crypt = sha1(req.body.mot_passe);
  var result = await utilisateurService.login({contact:req.body.contact,mot_passe:crypt});
  if(result.length>0){
    let token = sha1(Date.now());
    await utilisateurService.updateUser(result[0].id,{"token":token});
    result[0].token = token;
    var data = await utilisateurService.getProfil(result[0].id_profil);
    result.profil = data;
    return res.status(200).send({data:{utilisateur:{"token":token},profil: result.profil},
      message: "Succès"
    });
  }
  return res.status(500).send({
    message: "Donnée d'authentification incorrecte"
  });
};

exports.createCommande = async function (req, res) {
  const authHeader = req.headers['authorization'];
  if (!authHeader) {
      res.status(400).send({ message: "Page introuvable!" });
      return;
  }
  if (!req.body) {
      return res.status(400).send({
          message: "Les données d'inscription sont obligatoire!"
      });
  }
  const token = authHeader && authHeader.split(' ')[1];
  var users = await utilisateurService.findUser({ token: token });
  var plat = await utilisateurService.getPlat(req.body.id_plat);
  if (users.length == 0) res.status(500).json({ message: "Utilisateur n'existe pas" });
  if (plat.length == 0) res.status(500).json({ message: "Plat n'existe pas" });
  if (req.body.quantite&&Number(req.body.quantite) <= 0) res.status(500).json({ message: "La quantité est invalide" });
  try {
      var data = await utilisateurService.createCommande(users[0],plat[0],req.body.quantite);
      res.status(200).send({ message: "Commande enregistré" });
  } catch (error) {
       res.status(500).send({ message: "Commande non enregistré" });
  }
};

/*

updateUser
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
*/