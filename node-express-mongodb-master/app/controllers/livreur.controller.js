const db = require("../models");
var restaurantService = require('../services/restaurant.service');
var utilisateurService = require('../services/utilisateur.service');
const Utilisateur = db.utilisateur;
const sha1 = require('sha1');
//Ajouter un restaurant


//lister tous les restaurants
exports.findAll = async function (req, res, next) {
    try {
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
        if (profilEkaly.length == 0) res.status(500).json({ message: "profil ekaly non configuré" });
        if (profilLivreur.length == 0) res.status(500).json({ message: "profil livreur non configuré" });
        if (users[0].id_profil != profilEkaly[0].id) res.status(500).json({ message: "Vous devez connecter en tant qu'administrateur" });
        let livreurs = await utilisateurService.findUser({ id_profil: profilLivreur[0].id });
        return res.status(200).json({ status: 200, data: livreurs, message: "Succès" });

    } catch (e) {
         return res.status(500).json({ message: e.message });
    }
};
