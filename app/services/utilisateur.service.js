const db = require("../models");
const Profil = db.profil;
const Utilisateur = db.utilisateur;
const profilRestaurant = "Restaurant";
const profilClient = "Client";
const profilEkaly = "Responsable E-kaly";

const getProfilRestaurant = async function () {
    try {
        var profil = await Profil.find({ designation: profilRestaurant }).exec();
        return profil;
    } catch (e) {
        throw Error('Erreur de recherche de profil restaurant')
    }
};
const getProfilClient = async function () {
    try {
        var profil = await Profil.find({ designation: profilClient }).exec();
        return profil;
    } catch (e) {
        throw Error('Erreur de recherche de profil client')
    }
};
const getProfilEkaly = async function () {
    try {
        var profil = await Profil.find({ designation: profilEkaly }).exec();
        return profil;
    } catch (e) {
        throw Error('Erreur de recherche de profil Ekaly')
    }
};
const getProfil = async function (id_profil) {
    try {
        var profil = await Profil.find({ id: id_profil }).exec();
        return profil;
    } catch (e) {
        throw Error("Erreur de recherche de profil")
    }
};
const createClient = async function (utilisateur) {
    try {
        console.log("data");
        const user = new Utilisateur(utilisateur);
        return await user.save(user);       
    } catch (e) {
        throw Error("Erreur d'enregistrement du client")
    }
};

module.exports = {
    getProfilEkaly,
    getProfil,
    getProfilClient,
    getProfilRestaurant,
    createClient
};
/*exports.isClient = async function (query, page, limit) {
    try {
        var users = await User.find(query)
        return users;
    } catch (e) {
        // Log Errors
        throw Error('Erreur dans la ')
    }
}
exports.isEkaly = async function (query, page, limit) {
    try {
        var users = await User.find(query)
        return users;
    } catch (e) {
        // Log Errors
        throw Error('Erreur dans la ')
    }
}
*/