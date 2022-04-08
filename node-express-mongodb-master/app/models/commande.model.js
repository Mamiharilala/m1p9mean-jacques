const mongoose = require("mongoose");
var Schema = mongoose.Schema;
module.exports = mongoose => {
    var commande = mongoose.Schema(
        {
            id_utilisateur: { type: Schema.Types.ObjectId , required: true },
            id_plat: { type: Schema.Types.ObjectId , required: true },
            id_livreur: {type:Schema.Types.ObjectId},
            quantite: { type: Number, required: true, default: 1 },
            pu: { type: Number, required: true  },
            booked: { type: Boolean, required: true, default: false },
            etat: { type: Boolean, required: true, default: true }
        },
        { timestamps: true }
    );

    commande.method("toJSON", function () {
        const { __v, _id, ...object } = this.toObject();
        object.id = _id;
        return object;
    });

    const Commande = mongoose.model("commande", commande );
    return Commande;
};
