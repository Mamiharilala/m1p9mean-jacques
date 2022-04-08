module.exports = app => {
    const plat = require("../controllers/plat.controller.js");
  
    var router = require("express").Router();
  
    router.post("/", plat.create);
   
    router.get("/", plat.findAll);

    router.get("/commandesnotassigned", plat.findCommandeNontAssigned);

    app.use("/api/plat", router);
  };
  