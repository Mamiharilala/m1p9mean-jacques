module.exports = app => {
    const restaurant = require("../controllers/restaurant.controller.js");
  
    var router = require("express").Router();
  
    //router.post("/", restaurant.create);
    router.get("/", restaurant.findAll);

    app.use("/api/restaurant", router);
  };
  