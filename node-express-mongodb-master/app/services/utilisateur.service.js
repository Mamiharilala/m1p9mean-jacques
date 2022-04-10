const db = require("../models");
const Profil = db.profil;
var nodemailer = require('nodemailer');
const Plat = db.plat;
const Commande = db.commande;
const Utilisateur = db.utilisateur;
const profilRestaurant = "Restaurant";
const profilClient = "Client";
const profilEkaly = "Responsable E-kaly";
const profilLivreur = "Livreur";
var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'ekalym1mean@gmail.com',
      pass: 'uvhdqpojsbtkhoaf'
    }
  });
  

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
const getProfilLivreur = async function () {
    try {
        var profil = await Profil.find({ designation: profilLivreur }).exec();
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

const createLivreur= async function (utilisateur) {
    try {
        const user = new Utilisateur(utilisateur);
        var profilLivreur = await getProfilLivreur();
        if(profilLivreur.length>0){
            user.id_profil = profilLivreur[0].id;
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
        throw Error('Erreur de recherche de utilisateur')
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

const getPlat = async function (id_plat) {
    try {
        var plat = await Plat.find(new Plat({_id :id_plat})).exec();
        return plat;
    } catch (e) {
        throw Error("Erreur de recherche de profil")
    }
};



const createCommande = async function (utilisateur,plat,quantite) {
    try {
        var commande = new Commande({"id_utilisateur":utilisateur.id,"id_plat" :plat.id,"id_livreur" :null,"quantite":quantite,"pu":plat.prixVente,"id_restaurant":plat.id_restaurant,'nom_client':utilisateur.nom,'nom_plat':plat.designation});
        var commande = await commande.save(commande);
        return commande;
    } catch (e) {
        console.log(e);
        throw Error("Erreur d'enregistrement de commande")
    }
};

const updateCommande = async function(id,commande){
    try{
        await Commande.findByIdAndUpdate({"_id":id}, commande, { useFindAndModify: false });
    }catch(e){

    }
}

const findPlatLivrer = async function (id) {
    try {
        var commande = Commande.find({ id_livreur: id,booked:false }).exec();
        return commande;
    } catch (e) {
        throw Error("Erreur de recherche de commande");
    }
};

const sendWelcomeMail = async function(mail){
    var html = "<!DOCTYPE html PUBLIC '-//W3C//DTD XHTML 1.0 Transitional//EN' 'http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd'><html xmlns='http://www.w3.org/1999/xhtml'><head><meta content='text/html; charset=utf-8' http-equiv='Content-Type'><meta content='width=device-width, initial-scale=1' name='viewport'><title>PropTech Kenya Welcome Email</title><style type='text/css'>@import url(https://fonts.googleapis.com/css?family=Nunito);img {max-width: 600px;outline: none;text-decoration: none;-ms-interpolation-mode: bicubic;}html{margin: 0;padding:0;}a {text-decoration: none;border: 0;outline: none;color: #bbbbbb;}a img {border: none;}td, h1, h2, h3  {font-family: Helvetica, Arial, sans-serif;font-weight: 400;}td {text-align: center;}body {-webkit-font-smoothing:antialiased;-webkit-text-size-adjust:none;width: 100%;height: 100%;color: #666;background: #fff;font-size: 16px;height: 100vh;width: 100%;padding: 0px;margin: 0px;}table {border-collapse: collapse !important;}.headline {color: #444;font-size: 36px;}.force-full-width {width: 100% !important;}";
    html = html + "</style><style media='screen' type='text/css'>@media screen {td, h1, h2, h3 {font-family: 'Nunito', 'Helvetica Neue', 'Arial', 'sans-serif' !important;}}</style><style media='only screen and (max-width: 480px)' type='text/css'>@media only screen and (max-width: 480px) {table[class='w320'] {width: 320px !important;}}</style><style type='text/css'></style></head><body bgcolor='#fff' class='body' style='padding:20px; margin:0; display:block; background:#ffffff; -webkit-text-size-adjust:none'><table align='center' cellpadding='0' cellspacing='0' height='100%' width='100%'><tbody><tr><td align='center' bgcolor='#fff' class='' valign='top' width='100%'><center class=''><table cellpadding='0' cellspacing='0' class='w320' style='margin: 0 auto;' width='600'><tbody><tr><td align='center' class='' valign='top'><table cellpadding='0' cellspacing='0' style='margin: 0 auto;' width='100%'></table><table bgcolor='#fff' cellpadding='0' cellspacing='0' class='' style='margin: 0 auto; width: 100%; margin-top: 100px;'><tbody style='margin-top: 15px;'><tr class=''><td class=''></td></tr><tr class=''><td class='headline'>Bienvenue chez E-kaly!</td></tr><tr><td><center class=''><table cellpadding='0' cellspacing='0' class='' style='margin: 0 auto;' width='75%'><tbody class=''><tr class=''>";
    html = html + "<td class='' style='color:#444; font-weight: 400;'><br><br><em>E-Kaly</em> est une société de livraison qui permet de commander des plats dans divers restaurants et de se faire livrer à l’endroit qu’on veut.<br><br>Vos identifiants de connexion sont enregistrés. Nous sommes disponibles 24h/24:<br><br><span style='font-weight:bold;'>Email: &nbsp;</span><span style='font-weight:lighter;' class=''>ekalym1mean@gmail.com</span> <br><span style='font-weight:bold;'>Contact: &nbsp;</span><span style='font-weight:lighter;' class=''>+261 32 74 615 12</span><br><br></td></tr></tbody></table></center></td></tr><tr><td class=''><div class=''><a style='background-color:#2874A6 ;border-radius:4px;color:#fff;display:inline-block;font-family:Helvetica, Arial, sans-serif;font-size:18px;font-weight:normal;line-height:50px;text-align:center;text-decoration:none;width:350px;-webkit-text-size-adjust:none;' href='https://m1p9mean-jacques.herokuapp.com/'>Aller dans le site E-kaly</a></div><br></td></tr></tbody></table><table bgcolor='#fff' cellpadding='0' cellspacing='0' class='force-full-width' style='margin: 0 auto; margin-bottom: 5px:'><tbody><tr><td class='' style='color:#444;'><p>A très bientôt </p></td></tr></tbody></table></td></tr></tbody></table></center></td></tr></tbody></table></body></html>";
    var mailOptions = {
      from: 'ekalym1mean@gmail.com',
      to: mail,
      subject: 'Bienvenue chez E-kaly',
      html: html
    };
    transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
          console.log(error);
        } else {
          console.log('Email sent: ' + info.response);
        }
      });
}

module.exports = {
    findPlatLivrer,
    sendWelcomeMail,
    createCommande,
    updateCommande,
    getProfilEkaly,
    getProfil,
    getProfilLivreur,
    getPlat,
    updateUser,
    login,
    findUser,
    getProfilClient,
    getProfilRestaurant,
    createClient,
    createLivreur
};
 