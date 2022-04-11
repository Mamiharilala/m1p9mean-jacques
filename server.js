const express = require("express");
const cors = require("cors");

const app = express();

var corsOptions = {
  origin: ["https://m1p9mean-jacques.herokuapp.com","http://localhost:8087"],
  optionsSuccessStatus: 200
};

app.use(cors(corsOptions));

// parse requests of content-type - application/json
app.use(express.json());  
app.use(express.static(process.cwd()+"/dist/angular"));
// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

const db = require("./app/models");
db.mongoose
  .connect(db.url, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => {
    console.log("Connecté avec la base de données!");
  })
  .catch(err => {
    console.log("Erreur de connexion à la bdd!", err);
    process.exit();
  });

/*app.get("/", (req, res) => {
  res.json({ message: "Bonjour" });
});*/
app.get('/', (req,res) => {
  res.sendFile(process.cwd()+"dist/angular/index.html")
});

require("./app/routes/utilisateur.routes")(app);
require("./app/routes/profil.routes")(app);
require("./app/routes/restaurant.routes")(app);
require("./app/routes/plat.routes")(app);
require("./app/routes/livreur.routes")(app);
const PORT = process.env.PORT || 8087;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
