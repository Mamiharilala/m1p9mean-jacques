module.exports = app => {
    const plat = require("../controllers/plat.controller.js");
  
    var router = require("express").Router();
  
    router.post("/", plat.create);
   
    router.get("/", plat.findAll);

    router.get("/commandesnotassigned", plat.findCommandeNontAssigned);
    router.get("/commandesencours", plat.findCommandeEnCours);
    router.put("/update", plat.updateVisibility);
    router.put("/livrer", plat.livrer);
    app.use("/api/plat", router);
  };
  