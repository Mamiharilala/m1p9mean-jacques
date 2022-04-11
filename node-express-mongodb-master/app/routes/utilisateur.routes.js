module.exports = app => {
  const utilisateur = require("../controllers/utilisateur.controller.js");

  var router = require("express").Router();

  router.post("/client",utilisateur.createClient);
  router.post("/login",utilisateur.login);
  router.post("/commande",utilisateur.createCommande);
  router.post("/livreur",utilisateur.createLivreur);
  router.post("/",utilisateur.createUtilisateur);
  router.get("/beneficeparjour",utilisateur.getBeneficeParJour);
  router.get("/beneficeparrestaurant",utilisateur.getBeneficeParRestaurant);

  //router.get("/:id", utilisateur.findOne);
 
  router.put("/commande/assign", utilisateur.commandeAssign);
 
  //router.delete("/:id", utilisateur.delete);

  //router.delete("/", utilisateur.deleteAll);

  app.use("/api/utilisateur", router);
};
