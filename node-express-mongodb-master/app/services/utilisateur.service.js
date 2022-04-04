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
        var profil = await Profil.find(new Profil({_id :id_profil})).exec();
        return profil;
    } catch (e) {
        throw Error("Erreur de recherche de profil")
    }
};
const createClient = async function (utilisateur) {
    try {
        const user = new Utilisateur(utilisateur);
        var profilClient = await getProfilClient();
        if(profilClient.length>0){
            user.id_profil = profilClient[0].id;
        }
        return await user.save(user);
    } catch (e) {
        throw Error("Erreur d'enregistrement du client")
    }
};
const findUser = async function (user) {
    try {
        var utilisateur = await Utilisateur.find(user).exec();      
        return utilisateur;
    } catch (e) {
        throw Error('Erreur de recherche de restaurant')
    }
};

const login = async function (utilisateur) {
    try {
        var utilisateur = await findUser(utilisateur); 
        return utilisateur;
    } catch (e) {
        throw Error("Erreur de recupération de l'utilisateur")
    }
};

const updateUser = async function(id,user){
    try{
        await Utilisateur.findByIdAndUpdate(id, user, { useFindAndModify: false });
    }catch(e){

    }
}



module.exports = {
    getProfilEkaly,
    getProfil,
    updateUser,
    login,
    findUser,
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