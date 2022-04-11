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
        return res.status(200).json({ message: e.message });
    }
};
exports.findCommandeNontAssigned = async function (req, res, next) {
    try {
        let allCommandeNontAssigned = await restaurantService.getCommandeNontAssigned();
        return res.status(200).json({ status: 200, data: allCommandeNontAssigned, message: "Succès" });
    } catch (e) {
        return res.status(200).json({ message: e.message });
    }
};
exports.findCommandeEnCours = async function (req, res, next) {

    const authHeader = req.headers['authorization'];
    if (!authHeader) {
        res.status(400).send({ message: "Page introuvable!" });
        return;
    }
    const token = authHeader && authHeader.split(' ')[1];
    //rechercher l'utilisateur
    try {
        var users = await utilisateurService.findUser({ 'token': token });
        var profilRestaurant = await utilisateurService.getProfilRestaurant();
        if (users.length == 0) res.status(500).json({ message: "Restaurant n'existe pas" });
        if (profilRestaurant.length == 0) res.status(500).json({ message: "profil restaurant non configuré" });
        console.log(users);
        console.log(profilRestaurant);
        if (users[0].id_profil != profilRestaurant[0].id) res.status(500).json({ message: "Vous devez connecter en tant que restaurant" });
       
        let allCommandeEnCours = await restaurantService.findCommandeEnCours(users[0].id);
        return res.status(200).json({ status: 200, data: allCommandeEnCours, message: "Succès" });
    } catch (e) {
        return res.status(200).json({ message: e.message });
    }
};
exports.updateVisibility = async function (req, res, next) {
    const authHeader = req.headers['authorization'];
    console.log(authHeader);
    if (!authHeader) {
        res.status(200).send({ message: "Page introuvable!" });
        return;
    }
    if (!req.body) {
        return res.status(200).send({
            message: "Les données d'inscription sont obligatoire!"
        });
    }
    const token = authHeader && authHeader.split(' ')[1];
    try {
        var users = await utilisateurService.findUser({ token: token });
        var profilRestaurant = await utilisateurService.getProfilRestaurant();
        var plat = await restaurantService.getPlat(req.body.id_plat);
        if (plat.length == 0) res.status(500).json({ message: "Plat n'existe pas" });
        if (users.length == 0) res.status(500).json({ message: "Restaurant n'existe pas" });
        if (profilRestaurant.length == 0) res.status(500).json({ message: "profil restaurant non configuré" });
        if (users[0].id_profil != profilRestaurant[0].id) res.status(500).json({ message: "Vous devez connecter en tant que restaurant" });
        if(users[0].id!=plat[0].id_restaurant) res.status(500).json({ message: "Accès refusé" });
        await restaurantService.updatePlat(plat[0].id,{visibility:req.body.visibility});
        plat = await restaurantService.getPlat(req.body.id_plat);
        return res.status(200).send({ status: 200, data: plat, message: "Succès" });
    } catch (e) {
        return res.status(200).send({ message: e.message });
    }
};
exports.livrer = async function (req, res, next) {
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
    const token = authHeader && authHeader.split(' ')[1];
    try {
        var users = await utilisateurService.findUser({ token: token });
        var profilLivreur = await utilisateurService.getProfilLivreur();
         if (profilLivreur.length == 0) res.status(500).json({ message: "Livreur n'existe pas" });
        if (users.length == 0) res.status(500).json({ message: "Restaurant n'existe pas" });
        if (profilLivreur.length == 0) res.status(500).json({ message: "profil livreur non configuré" });
        if (users[0].id_profil != profilLivreur[0].id) res.status(500).json({ message: "Vous devez connecter en tant que livreur" });    
        var commande = await restaurantService.findCommande({'_id':req.body.idcommande});
        if(users[0].id!=commande[0].id_livreur) res.status(500).json({ message: "Accès refusé" });
      
        var plat = await restaurantService.getPlat(commande[0].id_plat);
        var livreur = await utilisateurService.findUser({ '_id': commande[0].id_livreur });
        var utilisateur = await utilisateurService.findUser({ '_id': commande[0].id_utilisateur });
        var restaurant = await utilisateurService.findUser({ '_id': commande[0].id_restaurant });

        if(plat.length==0)res.status(500).json({ message: "plat invalide" });
        if(livreur.length==0)res.status(500).json({ message: "livreur invalide" });
        if(utilisateur.length==0)res.status(500).json({ message: "utilisateur invalide" });
        if(restaurant.length==0)res.status(500).json({ message: "restaurant invalide" });
        
 
        var  benefit = {id_utilisateur: utilisateur[0].id,
            id_plat: plat[0].id,
            id_livreur: livreur[0].id,
            id_restaurant: restaurant[0].id,
            nom_client: utilisateur[0].nom,
            nom_plat: plat[0].designation,
            nom_restaurant: restaurant[0].nom,
            nom_livreur: livreur[0].nom,
            benefice: parseFloat(plat[0].prixVente) - parseFloat(plat[0].prixAchat) };

        await utilisateurService.createBenefice(benefit);
        await utilisateurService.updateCommande(req.body.idcommande, { booked: true });
        return res.status(200).json({ status: 200, message: "Livraison effectuée" });
    } catch (e) {
        console.log(e);
        return res.status(200).json({ message: e.message });
    }
};