const dbConfig = require("../config/db.config.js");

const mongoose = require("mongoose");
mongoose.Promise = global.Promise;

const db = {};
db.mongoose = mongoose;
db.url = dbConfig.url;
db.utilisateur = require("./utilisateur.model.js")(mongoose);
db.profil = require("./profil.model.js")(mongoose);
db.plat = require("./plat.model.js")(mongoose);
module.exports = db;
