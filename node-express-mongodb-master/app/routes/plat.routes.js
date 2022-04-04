module.exports = app => {
    const plat = require("../controllers/plat.controller.js");
  
    var router = require("express").Router();
  
    router.post("/", plat.create);
   
    //router.get("/", profil.findAll);

    app.use("/api/plat", router);
  };
  