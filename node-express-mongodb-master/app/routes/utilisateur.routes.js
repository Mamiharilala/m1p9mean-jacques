module.exports = app => {
  const utilisateur = require("../controllers/utilisateur.controller.js");

  var router = require("express").Router();

  router.post("/client",utilisateur.createClient);
  router.post("/login",utilisateur.login);
  router.post("/commande",utilisateur.createCommande);
 

  //router.get("/:id", utilisateur.findOne);
 
  //router.put("/:id", utilisateur.update);
 
  //router.delete("/:id", utilisateur.delete);

  //router.delete("/", utilisateur.deleteAll);

  app.use("/api/utilisateur", router);
};
