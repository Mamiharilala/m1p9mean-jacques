const mongoose = require("mongoose");
var Schema = mongoose.Schema;
module.exports = mongoose => {
  var profil = mongoose.Schema(
    {
      designation: {
        type: String,
        enum: ['Client', 'Restaurant', 'Livreur','Responsable E-kaly'],
        required: true
      },
      etat: { type: Boolean ,required: true,default: true}
    },
    { timestamps: true }
  );

  profil.method("toJSON", function() {
    const { __v, _id, ...object } = this.toObject();
    object.id = _id;
    return object;
  });
  
  const Profil = mongoose.model("profil", profil);
  return Profil;
};
