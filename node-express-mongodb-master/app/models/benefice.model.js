const mongoose = require("mongoose");
var Schema = mongoose.Schema;
module.exports = mongoose => {
    var benefice = mongoose.Schema(
        {
            id_utilisateur: { type: Schema.Types.ObjectId , required: true },
            id_plat: { type: Schema.Types.ObjectId , required: true },
            id_livreur: {type:Schema.Types.ObjectId},
            id_restaurant: {type:Schema.Types.ObjectId},
            nom_client: String,
            nom_plat: String,
            nom_restaurant: String,
            nom_livreur: String,
            benefice: { type: Number, required: true, default: 0 },
            etat: { type: Boolean, required: true, default: true }
        },
        { timestamps: true }
    );

    benefice.method("toJSON", function () {
        const { __v, _id, ...object } = this.toObject();
        object.id = _id;
        return object;
    });

    const Benefice = mongoose.model("benefice", benefice );
    return Benefice;
};
