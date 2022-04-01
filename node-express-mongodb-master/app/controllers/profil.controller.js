const db = require("../models");
const Profil = db.profil;

exports.create = (req, res) => {
    const profil = new Profil(req.body);
    if (!req.header('authorization')) {
        res.status(400).send({ message: "Page introuvable!" });
        return;
    }
    profil
        .save(profil)
        .then(data => {
            res.status(200).send({ "data": data });
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Une erreur est survenue lors de la création du profil."
            });
        });
};
//lister tous les profils
exports.findAll = (req, res) => {
    if (!req.header('authorization')) {
        res.status(400).send({ message: "Page introuvable!" });
        return;
    }
    Profil.find({})
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Une erreur est survenue lors de la récupération des profils."
            });
        });
};