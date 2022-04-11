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
        const token = authHeader && authHeader.split(' ')[1];
        var profilClient = await utilisateurService.getProfilClient();
        var profilEkaly = await utilisateurService.getProfilEkaly();
        var profilRestaurant = await utilisateurService.getProfilRestaurant();
        var users = await utilisateurService.findUser({ token: token });
        if (profilClient.length == 0) res.status(500).json({ message: "profil client non configuré" });
        if (profilEkaly.length == 0) res.status(500).json({ message: "profil e-kaly non configuré" });
        if (users.length == 0) res.status(500).json({ message: "Utilisateur n'existe pas" });
        if (profilRestaurant.length == 0) res.status(500).json({ message: "profil restaurant non configuré" });
        if (users[0].id_profil == profilClient[0].id || users[0].id_profil == profilEkaly[0].id) {
            let allRestaurant = await utilisateurService.findUser({ id_profil: profilRestaurant[0].id });
            return res.status(200).json({ status: 200, data: allRestaurant, message: "Succès" });
        }
    } catch (e) {
        console.log(e);
        return res.status(500).json({ message: e.message });
    }
};

exports.createRestaurant = async function (req, res) {
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
    if (users.length == 0) res.status(500).json({ message: "Utilisateur n'existe pas" });
    if (profilEkaly.length == 0) res.status(500).json({ message: "profil ekaly non configuré" });
    if (users[0].id_profil != profilEkaly[0].id) res.status(500).json({ message: "Vous devez connecter en tant qu'administrateur" });
    const utilisateur = new Utilisateur(req.body);
    utilisateur.mot_passe = sha1(utilisateur.mot_passe);
    utilisateur.token = sha1(Date.now());
    try {
        await restaurantService.createRestaurant(utilisateur);
        res.status(200).send({ data: { token: utilisateur.token }, message: "Restaurant enregistré" });
    } catch (error) {
        res.status(500).send({ message: "Client non enregistré" });
    }
};

exports.getPlatRestaurant = async function (req, res) {
    const authHeader = req.headers['authorization'];
    if (!authHeader) {
        res.status(400).send({ message: "Page introuvable!" });
        return;
    }
    const token = authHeader && authHeader.split(' ')[1];
    var users = await utilisateurService.findUser({ token: token });
    var profilRestaurant = await utilisateurService.getProfilRestaurant();
    if (users.length == 0) res.status(500).json({ message: "Utilisateur n'existe pas" });
    if (profilRestaurant.length == 0) res.status(500).json({ message: "profil restaurant non configuré" });
    if (users[0].id_profil != profilRestaurant[0].id) res.status(500).json({ message: "Vous devez connecter en tant que restaurant" });
    try {
        var val = await utilisateurService.getPlatRestaurant(users[0].id);
        res.status(200).send({ data:val, message: "Succès" });
    } catch (error) {
        console.log(error);
        res.status(200).send({ message: "Plat non trouvé" });
    }
};

exports.getBeneficeRestaurant = async function (req, res) {
    const authHeader = req.headers['authorization'];
    if (!authHeader) {
        res.status(400).send({ message: "Page introuvable!" });
        return;
    }
    const token = authHeader && authHeader.split(' ')[1];
    var users = await utilisateurService.findUser({ token: token });
    var profilRestaurant = await utilisateurService.getProfilRestaurant();
    if (users.length == 0) res.status(500).json({ message: "Utilisateur n'existe pas" });
    if (profilRestaurant.length == 0) res.status(500).json({ message: "profil restaurant non configuré" });
    if (users[0].id_profil != profilRestaurant[0].id) res.status(500).json({ message: "Vous devez connecter en tant que restaurant" });
    try {
        var val = await utilisateurService.getBeneficeRestaurant(users[0].id);
        console.log(val);
        res.status(200).send({ data:val, message: "Succès" });
    } catch (error) {
        console.log(error);
        res.status(200).send({ message: "Plat non trouvé" });
    }
};

