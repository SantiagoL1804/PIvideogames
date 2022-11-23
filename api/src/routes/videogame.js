const { Router } = require("express");
require("dotenv").config();
const { Videogame, Genre } = require("../db");
const axios = require("axios");
const router = Router();
const APIKEY = process.env.YOUR_API_KEY;

router.get("/:idVideogame", async (req, res) => {
  const { idVideogame } = req.params;
  console.log(idVideogame, "hola");
  try {
    if (idVideogame.includes("-")) {
      let videogameDB = await Videogame.findAll({
        where: {
          id: idVideogame,
        },
        include: Genre,
      });

      if (!videogameDB)
        res.status(404).send("No se encontró un videojuego con ese Id");

      videogameDB = JSON.stringify(videogameDB);
      videogameDB = JSON.parse(videogameDB);

      videogameDB = videogameDB.reduce(
        (acc, el) =>
          acc.concat({
            ...el,
            genres: el.genres.map((g) => g.name),
          }),
        []
      );

      return res.status(201).send(videogameDB);
    } else {
      let apiData = await axios.get(
        `https://api.rawg.io/api/games/${idVideogame}?key=${APIKEY}`
      );
      let game = apiData.data;

      let gameById = {
        name: game.name,
        image: game.background_image,
        description: game.description,
        platforms: game.platforms.map((p) => {
          return {
            id: p.platform.id,
            name: p.platform.name,
          };
        }),
        rating: game.rating,
        released: game.released,
        id: game.id,
        genres: game.genres.map((g) => g.name),
      };
      if (!gameById)
        res.status(404).send("No se encontró un videojuego con ese Id");
      return res.status(201).json(gameById);
    }
  } catch (error) {
    res.status(404).send(error.message);
  }
});

module.exports = router;
