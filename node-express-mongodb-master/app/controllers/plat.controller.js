const db = require("../models");
var utilisateurService = require('../services/utilisateur.service');
var restaurantService = require('../services/restaurant.service');
const Plat = db.plat;

exports.create = async function (req, res) {
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
    //rechercher l'utilisateur
    try {
        var users = await utilisateurService.findUser({ token: token });
        var profilRestaurant = await utilisateurService.getProfilRestaurant();
        if (users.length == 0) res.status(500).json({ message: "Restaurant n'existe pas" });
        if (profilRestaurant.length == 0) res.status(500).json({ message: "profil restaurant non configuré" });
        if (users[0].id_profil != profilRestaurant[0].id) res.status(500).json({ message: "Vous devez connecter en tant que restaurant" });
        const plat = new Plat(req.body);
        plat.id_restaurant = users[0].id;
        await restaurantService.createPlat(plat);
        res.status(200).send({ data: plat, message: "Plat enregistré" });
    } catch (error) {
        res.status(500).send({ message: "Plat non enregistré" });
    }

};
exports.findAll = async function (req, res, next) {
    try {
        let allRestaurant = await restaurantService.getAllPlat();
        return res.status(200).json({ status: 200, data: allRestaurant, message: "Succès" });
    } catch (e) {
        console.log(e);
        return res.status(500).json({ message: e.message });
    }
};