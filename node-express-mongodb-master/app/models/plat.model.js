const mongoose = require("mongoose");
var Schema = mongoose.Schema;
module.exports = mongoose => {
    var plat = mongoose.Schema(
        {
            designation: {
                type: String,
                required: true
            },
            prixAchat: { type: Number, required: true, default: 5000 },
            prixVente: { type: Number, required: true, default: 5000 },
            id_restaurant: Schema.Types.ObjectId ,
            visibility: { type: Boolean, required: true, default: true },
            etat: { type: Boolean, required: true, default: true }
        },
        { timestamps: true }
    );

    plat.method("toJSON", function () {
        const { __v, _id, ...object } = this.toObject();
        object.id = _id;
        return object;
    });

    const Plat = mongoose.model("plat", plat);
    return Plat;
};
