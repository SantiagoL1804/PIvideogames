const { Router } = require("express");
require("dotenv").config();
const APIKEY = process.env.YOUR_API_KEY;
// Importar todos los routers;
const genresMiddleware = require("./genres");
const videogamesMiddleware = require("./videogames");
const videogameMiddleware = require("./videogame");
const platformsMiddleware = require("./platforms");

const router = Router();

// Configurar los routers
router.use("/videogames", videogamesMiddleware);
router.use("/videogame", videogameMiddleware);
router.use("/genres", genresMiddleware);
router.use("/platforms", platformsMiddleware);

module.exports = router;
