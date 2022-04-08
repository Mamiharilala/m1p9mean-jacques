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
  utilisateur.token = sha1(Date.now());
  try {
    await utilisateurService.createClient(utilisateur);
    res.status(200).send({ data: { token: utilisateur.token }, message: "Client enregistré" });
  } catch (error) {
    res.status(500).send({ data: {}, message: "Client non enregistré" });
  }
};

exports.login = async function (req, res) {
  if (!req.body) {
    return res.status(400).send({
      message: "Les données d'authentification sont obligatoire!"
    });
  }
  const crypt = sha1(req.body.mot_passe);
  var result = await utilisateurService.login({ contact: req.body.contact, mot_passe: crypt });
  if (result.length > 0) {
    let token = sha1(Date.now());
    await utilisateurService.updateUser(result[0].id, { "token": token });
    result[0].token = token;
    var data = await utilisateurService.getProfil(result[0].id_profil);
    result.profil = data;
    return res.status(200).send({
      data: { utilisateur: { "token": "Barear " + token }, profil: result.profil },
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
    res.status(200).send({ message: "Page introuvable!" });
    return;
  }
  console.log(authHeader);
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
  if (req.body.quantite && Number(req.body.quantite) <= 0) res.status(500).json({ message: "La quantité est invalide" });
  try {
    var data = await utilisateurService.createCommande(users[0], plat[0], req.body.quantite);
    res.status(200).send({ message: "Commande enregistré" });
  } catch (error) {
    res.status(200).send({ message: "Commande non enregistré" });
  }
};
 
exports.commandeAssign = async function (req, res) {
  const authHeader = req.headers['authorization'];
  if (!authHeader) {
    res.status(400).send({ message: "Page introuvable!" });
    return;
  }
  if (!req.body) {
    return res.status(400).send({
      message: "Les données sont obligatoire!"
    });
  }
  console.log(req.body);
  const token = authHeader && authHeader.split(' ')[1];
  var users = await utilisateurService.findUser({ token: token });
  var profilEkaly = await utilisateurService.getProfilEkaly();
  var profilLivreur = await utilisateurService.getProfilLivreur();
  if (users.length == 0) res.status(500).json({ message: "Utilisateur n'existe pas" });
  if (profilLivreur.length == 0) res.status(500).json({ message: "Profil livreur non configuré" });
  if (profilEkaly.length == 0) res.status(500).json({ message: "profil ekaly non configuré" });
  if (users[0].id_profil != profilEkaly[0].id) res.status(500).json({ message: "Vous devez connecter en tant qu'administrateur" });
  try {
    console.log(req.body.idcommande);
    await utilisateurService.updateCommande(req.body.idcommande,{id_livreur:req.body.idlivreur});
    res.status(200).send({ message: "Livreur assigné" });
  } catch (error) {
  
    res.status(500).send({ message: "Assign non terminé" });
  }

}

exports.createLivreur = async function (req, res) {
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
  var profilEkaly = await utilisateurService.getProfilEkaly();
  var profilLivreur = await utilisateurService.getProfilLivreur();
  if (users.length == 0) res.status(500).json({ message: "Utilisateur n'existe pas" });
  if (profilLivreur.length == 0) res.status(500).json({ message: "Profil livreur non configuré" });
  if (profilEkaly.length == 0) res.status(500).json({ message: "profil ekaly non configuré" });
  if (users[0].id_profil != profilEkaly[0].id) res.status(500).json({ message: "Vous devez connecter en tant qu'administrateur" });
  const utilisateur = new Utilisateur(req.body);
  utilisateur.mot_passe = sha1(utilisateur.mot_passe);
  utilisateur.token = sha1(Date.now());
  try {
    await utilisateurService.createLivreur(utilisateur);
    res.status(200).send({ data: { token: utilisateur.token }, message: "Livreur enregistré" });
  } catch (error) {
    res.status(500).send({ message: "Client non enregistré" });
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