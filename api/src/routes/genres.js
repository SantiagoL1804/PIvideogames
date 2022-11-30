const { Router } = require("express");
const { Genre } = require("../db");
require("dotenv").config();
const router = Router();
const axios = require("axios");
const APIKEY = process.env.YOUR_API_KEY;

router.get("/", async (req, res) => {
  // Me traigo data de generos de api externa y la guardo en api
  try {
    //En caso de que ya haya generos en mi db, la traigo
    const genres = await Genre.findAll({
      attributes: ["name"],
    });
    if (genres.length) return res.json(genres);
    console.log(genres);

    const api = await axios.get(`https://api.rawg.io/api/genres?key=${APIKEY}`);

    //Hago un map para quedarme con las propiedades dentro de la data que necesito, en este caso, name y games asociados
    const genresApi = api.data.results.map((genre) => genre.name);
    // .map((g) => {
    //   return {
    //     name: g.name,
    //     id: g.id,
    //   };
    // });

    //Creo y guardo lo que me traje de la api externa en el modelo Genre de mi base de datos

    // await Genre.bulkCreate(genresApi);

    genresApi.forEach((genre) => {
      Genre.findOrCreate({ where: { name: genre } });
    });
    // const genresREADY = genresApi.map((game) => {
    //   return {
    //     id: game.id,
    //     name: game.name,
    //   };
    // });

    // const genresDB = await Genre.findAll({
    //   attributes: ["id", "name"],
    // });
    res.json(genresApi);
  } catch (error) {
    res.send(error.message);
  }
});

module.exports = router;
