const db = require("../models");
const Profil = db.profil;
const profilRestaurant = "Restaurant";
exports.getProfilRestaurant = async function () {
    try {
        var profil = await Profil.find({designation: profilRestaurant }).exec();      
        return profil;
    } catch (e) {
        console.log(e);
        // Log Errors
        throw Error('Erreur de recherche de restaurant')
    }
};