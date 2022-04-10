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
        return await plat.save(plat);
    } catch (e) {
        throw Error("Erreur d'enregistrement du plat")
    }
};
const getAllPlat = async function () {
    try {
        var plat = await Plat.find({ "etat": true, "visibility": true }).exec();
        return plat;
    } catch (e) {
        throw Error("Erreur de recherche de profil");
    }
};
const getPlat = async function (id) {
    try {
        var plat = await Plat.find({ '_id':id }).exec();
         return plat;
    } catch (e) {
        throw Error("Erreur de recherche de plat");
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
            }, {
                $match: {
                    "booked": false,
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
const findCommandeEnCours = async function (id) {
    try {
        var commande = Commande.find({ "id_restaurant": id }).exec();
        return commande;
    } catch (e) {
        throw Error("Erreur de recherche de commande");
    }
};
const findCommande = async function (cond) {
    try {
        var commande = Commande.find(  cond ).exec();
        return commande;
    } catch (e) {
        throw Error("Erreur de recherche de commande");
    }
};
const updatePlat = async function(id,plat){
    try{
        await Plat.findByIdAndUpdate(id, plat, { useFindAndModify: false });
    }catch(e){

    }
}



module.exports = {
    getPlat,
    updatePlat,
    findCommande,
    findCommandeEnCours,
    createRestaurant,
    getCommandeNontAssigned,
    getProfilRestaurant,
    createPlat,
    getAllPlat
};