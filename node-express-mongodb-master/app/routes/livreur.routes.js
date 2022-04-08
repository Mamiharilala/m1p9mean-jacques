module.exports = app => {
    const livreur = require("../controllers/livreur.controller.js");
  
    var router = require("express").Router();
  
     router.get("/", livreur.findAll);

    app.use("/api/livreurs", router);
  };
  