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
        var commande = new Commande({"id_utilisateur":utilisateur.id,"id_plat" :plat.id,"id_livreur" :null,"quantite":quantite,"pu":plat.prixVente});
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
const sendWelcomeMail = async function(mail){
    var html = "<!DOCTYPE html PUBLIC '-//W3C//DTD XHTML 1.0 Transitional//EN' 'http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd'><html xmlns='http://www.w3.org/1999/xhtml'><head><meta content='text/html; charset=utf-8' http-equiv='Content-Type'><meta content='width=device-width, initial-scale=1' name='viewport'><title>PropTech Kenya Welcome Email</title><style type='text/css'>@import url(https://fonts.googleapis.com/css?family=Nunito);img {max-width: 600px;outline: none;text-decoration: none;-ms-interpolation-mode: bicubic;}html{margin: 0;padding:0;}a {text-decoration: none;border: 0;outline: none;color: #bbbbbb;}a img {border: none;}td, h1, h2, h3  {font-family: Helvetica, Arial, sans-serif;font-weight: 400;}td {text-align: center;}body {-webkit-font-smoothing:antialiased;-webkit-text-size-adjust:none;width: 100%;height: 100%;color: #666;background: #fff;font-size: 16px;height: 100vh;width: 100%;padding: 0px;margin: 0px;}table {border-collapse: collapse !important;}.headline {color: #444;font-size: 36px;}.force-full-width {width: 100% !important;}";
    html = html + "</style><style media='screen' type='text/css'>@media screen {td, h1, h2, h3 {font-family: 'Nunito', 'Helvetica Neue', 'Arial', 'sans-serif' !important;}}</style><style media='only screen and (max-width: 480px)' type='text/css'>@media only screen and (max-width: 480px) {table[class='w320'] {width: 320px !important;}}</style><style type='text/css'></style></head><body bgcolor='#fff' class='body' style='padding:20px; margin:0; display:block; background:#ffffff; -webkit-text-size-adjust:none'><table align='center' cellpadding='0' cellspacing='0' height='100%' width='100%'><tbody><tr><td align='center' bgcolor='#fff' class='' valign='top' width='100%'><center class=''><table cellpadding='0' cellspacing='0' class='w320' style='margin: 0 auto;' width='600'><tbody><tr><td align='center' class='' valign='top'><table cellpadding='0' cellspacing='0' style='margin: 0 auto;' width='100%'></table><table bgcolor='#fff' cellpadding='0' cellspacing='0' class='' style='margin: 0 auto; width: 100%; margin-top: 100px;'><tbody style='margin-top: 15px;'><tr class=''><td class=''><img alt='robot picture' class='' height='155' src='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAfQAAAH0CAYAAADL1t+KAAAAAXNSR0IArs4c6QAAAAlwSFlzAAAOxAAADsQBlSsOGwAABHdpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0n77u/JyBpZD0nVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkJz8+Cjx4OnhtcG1ldGEgeG1sbnM6eD0nYWRvYmU6bnM6bWV0YS8nPgo8cmRmOlJERiB4bWxuczpyZGY9J2h0dHA6Ly93d3cudzMub3JnLzE5OTkvMDIvMjItcmRmLXN5bnRheC1ucyMnPgoKIDxyZGY6RGVzY3JpcHRpb24gcmRmOmFib3V0PScnCiAgeG1sbnM6QXR0cmliPSdodHRwOi8vbnMuYXR0cmlidXRpb24uY29tL2Fkcy8xLjAvJz4KICA8QXR0cmliOkFkcz4KICAgPHJkZjpTZXE+CiAgICA8cmRmOmxpIHJkZjpwYXJzZVR5cGU9J1Jlc291cmNlJz4KICAgICA8QXR0cmliOkNyZWF0ZWQ+MjAyMi0wNC0wODwvQXR0cmliOkNyZWF0ZWQ+CiAgICAgPEF0dHJpYjpFeHRJZD4wOGJmNjVjNy1mM2VjLTRjNDctYTM1ZC1kOGFjY2Y5ZTM0NWU8L0F0dHJpYjpFeHRJZD4KICAgICA8QXR0cmliOkZiSWQ+NTI1MjY1OTE0MTc5NTgwPC9BdHRyaWI6RmJJZD4KICAgICA8QXR0cmliOlRvdWNoVHlwZT4yPC9BdHRyaWI6VG91Y2hUeXBlPgogICAgPC9yZGY6bGk+CiAgIDwvcmRmOlNlcT4KICA8L0F0dHJpYjpBZHM+CiA8L3JkZjpEZXNjcmlwdGlvbj4KCiA8cmRmOkRlc2NyaXB0aW9uIHJkZjphYm91dD0nJwogIHhtbG5zOmRjPSdodHRwOi8vcHVybC5vcmcvZGMvZWxlbWVudHMvMS4xLyc+CiAgPGRjOnRpdGxlPgogICA8cmRmOkFsdD4KICAgIDxyZGY6bGkgeG1sOmxhbmc9J3gtZGVmYXVsdCc+RTwvcmRmOmxpPgogICA8L3JkZjpBbHQ+CiAgPC9kYzp0aXRsZT4KIDwvcmRmOkRlc2NyaXB0aW9uPgoKIDxyZGY6RGVzY3JpcHRpb24gcmRm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Zn+2W6+Ic578fNR77Bwx7EK3k5GdJXfIoba2Nr797W/nulree++948Ybb4wOHTrkOve7774bVVVVUVVVFe3atfvcf9/495r7jfA8T1Fbvnx55jGFVFNTk/k+/OZceb/66quZbz3s1atXHHDAAZnG7LRfxL+8GfGnWyO697YPTssIOuRwzTXXxKOPPpp53O677x4/+clPWvSK0jyPPm2OLl26ZB5T6qAfffTRMXHixExf6FuwYEG8+OKLjT68J8/V+ejRo3OtuHTrFTF8QuZh8DmCTlm6++67cz1pbWMDBw7M/UKPTfnlL38ZN998c+ZxO+ywQ0yZMiW6d+9e0PlktXr16lixYkUsX748VqxYEWvXro2IyPUwnBUrVhR6eplsvvnmcfzxx8edd96Zadzjjz/eaNCz7p+3a9cuTj755ExjoNAEnbJ0ww03xPz581t8nK9//esFDfqzzz4bt9xyS+ZxW2+9ddxxxx2x3XbbFWwuTXnvvffi6aefjtdeey1eeeWVeOWVV2LevHm538vekKzfAi+GmpqazEGfPn16nHvuuQ3+bM2aNZnvcT/kkENi++23zzQGCk3QIYM8D3Sprq6OKVOmxC67FH9z9PXXX49HHnkkHn300Zg9e3bRz1cOQd9jjz1i8ODB8dxzzzV7zJ///OdYvnx5bLHFFp/72TPPPJP5roXmvIgFik3Qociuueaaoj9A55VXXonrrrsuHn744aKeZ2OFvNpviZqamkxBX79+ffzhD3+Iww8//HM/y7rcvt1228XBBx+caQwUg6CzST179owDDzywaMffdttti3bscnLnnXfG8OHDc31hqikrVqyIyy67LH71q1+V5JWmpXqN6saOOeaYmDRpUqbvXUyfPr3BoGf9Qtw//dM/Rfv27TONgWIQdDZpwIABceWVV5Z6GhXviSeeiB/84Ae5nya3KW+88Uacc8458eqrrxb0uJWoa9eucdxxx8W9997b7DENXYm/++67mf48q6qq4pRTTmn256GYPFgGWsFNN90UjzzySMGON2fOnDjhhBPE/FOyPNQlou4BPXPnzv3M72W9Oj/ggANihx12yDQGisUVOmXpiCOOyPzijYYMHjy4ALMpjHHjxkW/fv1i1113bdFxli1bFueff37ml6mk7ktf+lIMHDgw08N+pk2bFn379v3MP2fhy3CUE0GnLDX17PFKtGLFijj33HPjV7/6VYPfrm6uSy65JObNy/Fmj6hbIt53331jn332iT59+kTHjh2jffv20b59+5g+fXpMnTo197zKQU1NTUyY0PyntEyfPv3jNwpu2LAh00N7tt566xg+fHjmOUKxCDq0orlz58bFF18cN910U7NesbmxV199NX7729/mOndNTU1ceOGFm/wyYp5n0peb4447LiZPnhyrV69u1uf/+Mc/xurVq6Nz584xc+bMTKseJ598cu7H90Ix2EOHHHr16pX7VrTf/e53ue5nj4i45557co2bOHFiXHHFFY3eWVAu31hvierq6jjmmGOa/fm1a9d+/BCZrPvnvgxHuRF0yGjLLbeM22+/Pf7t3/4t1/PPIyJ++MMf5no9569//evMY4YOHRpf/epXm/xcKnvyWb8cV//2tSz/ewwdOrRVHhQEWQg6ZLD55pvHT37yk+jbt2/ssssuud5nHlF3NTx27NhMe+HLli2LDz/8MPO5GrrXuiFvvvlm5mMXQ0ufPrf33nvH7rvv3uzPT5s2LT788MN4/vnnmz0mz7vYodgEHTKYMGFC7Lnnnh//80knnRTHHntsrmMtXbo0zj333Fi1alWzPp/n5SkREd26dWvyM6tWrYrHH3881/GLoaUvfckS3Llz58bUqVObveXQo0ePGDlyZN6pQdH4Uhyb9N5778WDDz5Y9PP0798/dtttt6KfpxAaegHHxIkTY+bMmfH2229nPt5LL70U//qv/xrXXnttk59dtGhR5uNHRLzwwgtx4oknNvqZyZMnxwcffJDr+I3J+wS1t99+O/r375/7vCeeeGJcddVVH79Jrik33XRTpmN37Ngx79SgaASdTZozZ05ceOGFRT/Pt771rYoJekOqq6vj2muvjdGjR+daLn7ggQdi8ODBccYZZzT6ua233jrX/KZOnRqjR4/e5J/xXXfdFXfffXeuYzf1LPdOnTrlOu5dd90V3/ve93KNjYjo3r17HHXUUXH//fc36/NZVgQst1OuLLlDAey9994xZsyY3OO///3vxx//+MdGP5P31asrV66MmpqauPnmm2Pu3LmxZs2amD9/fvz3f/93jB49OtN92xtr6vawzTffPNdx77rrrjjooIPivPPOi7Fjx+Z6yl4xHvoyZMiQiv7LJ2lzhQ4Fct5558WMGTMyv0s7ou6LYGPGjIn7778/evbs2eBnunXrFjvvvHOuL68tXrw4rr766rj66qszj21MU0vaee8CiKh7NOs777wTERF9+/bNvG+97777Rt++fT/3eNeWcHVOOXOFDgXSrl27+MEPfhDdu3fPNf6DDz6I8847r9FIHn300XmnVxRNXaHn3SYolKy3sDWmurq67P784dMEHQqoZ8+eLXpD3XPPPdfoEvioUaOK9qrOTz/TvLnWrVvX6D76F77whRZdpbfUiSeeWLCnuR1//PHRuXPnghwLikHQocBGjhzZov3b//zP/9zkE+H69u0bp512Wu5jN2b8+PG5xjV1b/ywYcNyHbcQttpqq4LdYlbIq30oBkGHIrj00kujX79+ucdffvnlMXPmzAZ/Nnbs2IJ/MWu33XaLww47rFn3rG9s4cKFjf681PvOhTj/4MGDY4899ijAbKB4BB2KoHPnznHdddflvl953bp1cf755zcYy65du8add94Zffr0aek0P1YfvTzL7vPnz2/058OHD48RI0bkmlchDB06NHr37t2iY7g6pxIIOhTJgAED4pJLLsk9/r333ovzzz8/1q1b97mfbbPNNvGzn/2sIMvJhx12WJx00kkREbne1V7/TfTGXHvttbH//vtnPnYhVFVVtegqvUuXLple+AKlIuhQRKeddloceuihucf/6U9/ismTJzf4s6222ipuvPHGuPHGG2Pw4MGZjtuxY8cYOXJk/OIXv4gf//jHHy+157lCb84T8rp06RJTpkyJSZMmxY477pj5HC118sknx2ab5btL99hjj42uXbsWeEZQeFW1KbwzEYjZs2fHtGnT4tlnn425c+fGhx9+GGvXro3OnTtHdXV19O7dO774xS/GXnvtFcOHD4/q6uqSznXmzJnxyiuvxOLFi2PFihVRVVUVHTp0iA4dOkTHjh2juro6unfvHj169Ij99tsvBg0a1KJznnfeebkeUPPAAw/kflUutCZBh4Rt2LChaLe5VZrHHnsszj777Exj9t1337j33nuLNCMoLEvukDAx/8Ts2bMzjzn99NOLMBMoDlfoQPLeeeedGDlyZLNfVRsR0atXr3j88cf9pYiK4QodSNr69evj0ksvzRTziIgzzjhDzKkortCBZC1YsCAuvPDCePrppzON69WrVzz22GPee05F8bY1oKI9/PDDsXr16ujcuXN07tw5VqxYEQsWLIinn346fv/73zf5zvaGXHTRRWJOxXGFDlS0Y445Jv76178W7Hj9+/ePBx98MNq1syNJZfFvLMDfdejQIa655hoxpyL5txbg77797W97iAwVS9ABIuLwww+PM888s9TTgNwEHWjzRowYEddff31UVVWVeiqQm6ADbdopp5wSN9xwg2+1U/Hctga0Sb17944rrrgihg0bVuqpQEEIOtBmdOvWLQ4++OAYNWpUHHDAAb7NTlLchw5UtNdffz3efPPNmD9/fixdujTWrVsX69atiw4dOkSXLl2iS5cuse2228aAAQOiZ8+epZ4uFI2gA0ACrDcBQAIEHQASIOgAkABBB4AECDoAJEDQASABgg4ACRB0AEiAoANAAgQdABIg6ACQAEEHgAQIOgAkQNABIAGCDgAJEHQASICgA0ACBB0AEiDoAJAAQQeABAg6ACRA0AEgAYIOAAkQdABIgKADQAIEHQASIOgAkABBB4AECDoAJEDQASABgg4ACRB0AEiAoANAAgQdABIg6ACQAEEHgAQIOgAkQNABIAGCDgAJEHQASICgA0ACBB0AEiDoAJAAQQe5cT0qAAACW0lEQVSABAg6ACRA0AEgAYIOAAkQdABIgKADQAIEHQASIOgAkABBB4AECDoAJEDQASABgg4ACRB0AEiAoANAAgQdABIg6ACQAEEHgAQIOgAkQNABIAGCDgAJEHQASICgA0ACBB0AEiDoAJAAQQeABAg6ACRA0AEgAYIOAAkQdABIgKADQAIEHQASIOgAkABBB4AECDoAJEDQASABgg4ACRB0AEiAoANAAgQdABIg6ACQAEEHgAQIOgAkQNABIAGCDgAJEHQASICgA0ACBB0AEiDoAJAAQQeABAg6ACRA0AEgAYIOAAkQdABIgKADQAIEHQASIOgAkABBB4AECDoAJEDQASABgg4ACRB0AEiAoANAAgQdABIg6ACQAEEHgAQIOgAkQNABIAGCDgAJEHQASICgA0ACBB0AEiDoAJAAQQeABAg6ACRA0AEgAYIOAAkQdABIgKADQAIEHQASIOgAkABBB4AECDoAJEDQASABgg4ACRB0AEiAoANAAgQdABIg6ACQAEEHgAQIOgAkQNABIAGCDgAJEHQASICgA0ACBB0AEiDoAJAAQQeABAg6ACRA0AEgAYIOAAkQdABIgKADQAIEHQASIOgAkABBB4AECDoAJEDQASABgg4ACRB0AEiAoANAAgQdABIg6ACQAEEHgAQIOgAkQNABIAGCDgAJEHQASICgA0ACBB0AEiDoAJAAQQeABAg6ACRA0AEgAYIOAAkQdABIgKADQAIEHQASIOgAkABBB4AECDoAJEDQASABgg4ACRB0AEiAoANAAgQdABIg6ACQAEEHgAT8f21t0X7BLUKIAAAAAElFTkSuQmCC' width='155'></td></tr><tr class=''><td class='headline'>Bienvenue chez E-kaly!</td></tr><tr><td><center class=''><table cellpadding='0' cellspacing='0' class='' style='margin: 0 auto;' width='75%'><tbody class=''><tr class=''>";
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