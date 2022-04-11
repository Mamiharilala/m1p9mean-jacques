const dbConfig = require("../config/db.config.js");

const mongoose = require("mongoose");
mongoose.Promise = global.Promise;

const db = {};
db.mongoose = mongoose;
db.url = dbConfig.urlprod;
db.utilisateur = require("./utilisateur.model.js")(mongoose);
db.profil = require("./profil.model.js")(mongoose);
db.plat = require("./plat.model.js")(mongoose);
db.benefice = require("./benefice.model.js")(mongoose);
db.commande = require("./commande.model.js")(mongoose);
module.exports = db;
