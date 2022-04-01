module.exports = app => {
    const profil = require("../controllers/profil.controller.js");
  
    var router = require("express").Router();
  
    router.post("/", profil.create);
   
    router.get("/", profil.findAll);

    app.use("/api/profil", router);
  };
  