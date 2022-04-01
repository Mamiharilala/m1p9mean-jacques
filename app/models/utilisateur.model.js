const mongoose = require("mongoose");
var Schema = mongoose.Schema;
module.exports = mongoose => {
  var utilisateur = mongoose.Schema(
    {
      nom: { type: String ,required: true },
      prenom: String,
      date_naissance: Date,
      contact:{ type: String ,required: true },
      email: String,
      adresse:String,
      id_profil:Schema.Types.ObjectId,
      mot_passe: { type: String ,required: true },
      etat: { type: Boolean ,required: true,default: true},
      token: String
    },
    { timestamps: true }
  );

  utilisateur.method("toJSON", function() {
    const { __v, _id, ...object } = this.toObject();
    object.id = _id;
    return object;
  });

  const Utilisateur = mongoose.model("utilisateur", utilisateur);
  return Utilisateur;
};
