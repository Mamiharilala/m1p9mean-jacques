const db = require("../models");
var restaurantService = require('../services/restaurant.service');
const Restaurant = db.utilisateur;
const Utilisateur = db.utilisateur;
const Profil = db.profil;

//Ajouter un restaurant


//lister tous les restaurants
exports.findAll = async function (req, res, next){
    try {
        var profils = await restaurantService.getProfilRestaurant();
        return res.status(200).json({ status: 200, data: profils, message: "Succesfully Profil Retrieved" });
    } catch (e) {
        return res.status(400).json({ status: 400, message: e.message });
    }
};
