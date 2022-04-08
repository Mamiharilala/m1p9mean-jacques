const { commande } = require("../models");
const db = require("../models");
const Profil = db.profil;
const Utilisateur = db.utilisateur;
const Plat = db.plat;
const Commande = db.commande;
const profilRestaurant = "Restaurant";
var utilisateurService = require('./utilisateur.service');
const getProfilRestaurant = async function () {
    try {
        var profil = await Profil.find({ designation: profilRestaurant }).exec();
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
        if (profilRestaurant.length > 0) {
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
        var plat = await Plat.find({ "etat": true, "visibility": true }).exec();
        console.log(new Plat({ "etat": true, "visibility": true }));
        return plat;
    } catch (e) {
        throw Error("Erreur de recherche de profil");
    }
};
const getCommandeNontAssigned = async function () {
    try {
        var commande = Commande.aggregate([
            {
                $lookup:
                {
                    from: "utilisateurs",
                    localField: "id_utilisateur",
                    foreignField: "_id",
                    as: "utilisateur"
                }
            },
            {
                $lookup:
                {
                    from: "plats",
                    localField: "id_plat",
                    foreignField: "_id",
                    as: "plat"
                }
            },{
                $match: {
                    "booked" : false,
                    "id_livreur": null,
                    "etat": true
                }
               
            }
        ]).exec();
        return commande;
    } catch (e) {
        throw Error("Erreur de recherche de commande");
    }
};

module.exports = {
    createRestaurant,
    getCommandeNontAssigned,
    getProfilRestaurant,
    createPlat,
    getAllPlat
};