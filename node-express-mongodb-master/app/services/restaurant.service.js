const db = require("../models");
const Profil = db.profil;
const Utilisateur = db.utilisateur;
const Plat = db.plat;
const profilRestaurant = "Restaurant";
var utilisateurService = require('./utilisateur.service');
const getProfilRestaurant = async function () {
    try {
        var profil = await Profil.find({designation: profilRestaurant }).exec();      
        return profil;
    } catch (e) {
        console.log(e);
        // Log Errors
        throw Error('Erreur de recherche de restaurant')
    }
};
const createRestaurant = async function (utilisateur) {
    try {
        const user = new Utilisateur(utilisateur);
        var profilRestaurant = await utilisateurService.getProfilRestaurant();
        if(profilRestaurant.length>0){
            user.id_profil = profilRestaurant[0].id;
        }
        return await user.save(user);
    } catch (e) {
        throw Error("Erreur d'enregistrement du client")
    }
};
const createPlat = async function (plat) {
    try {
        console.log(plat);
        return await plat.save(plat);
    } catch (e) {
        throw Error("Erreur d'enregistrement du plat")
    }
};
const getAllPlat = async function () {
    try {
        var plat = await Plat.find({"etat":true,"visibility":true}).exec();
        console.log(new Plat({"etat":true,"visibility":true}));
         return plat;
    } catch (e) {
         throw Error("Erreur de recherche de profil");
    }
};
module.exports = {
    createRestaurant,
    getProfilRestaurant,
    createPlat,
    getAllPlat
};