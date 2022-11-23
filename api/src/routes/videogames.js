const { Router } = require("express");
require("dotenv").config();
const { Videogame, Genre } = require("../db");
const router = Router();
const axios = require("axios");
const APIKEY = process.env.YOUR_API_KEY;

//GET BY QUERIES

// router.get("/", async (req, res) => {

// });

router.get("/", async (req, res) => {
  try {
    let vidgamesDB = await Videogame.findAll({
      attributes: ["id", "name"],
      include: Genre,
    });

    vidgamesDB = JSON.stringify(vidgamesDB);
    vidgamesDB = JSON.parse(vidgamesDB);

    vidgamesDB = vidgamesDB.reduce(
      (acc, el) =>
        acc.concat({
          ...el,
          genres: el.genres.map((g) => g.name),
        }),
      []
    );

    if (!req.query.name) {
      let pages = 0;

      let apiData = await axios.get(
        `https://api.rawg.io/api/games?key=${APIKEY}`
      );

      let allGames = [...vidgamesDB];

      while (allGames.length <= 100) {
        pages++;

        let apiVidgames = apiData.data.results.map((game) => {
          return {
            id: game.id,
            name: game.name,
            image: game.background_image,
            genres: game.genres.map((g) => g.name),
          };
        });
        allGames = [...allGames, ...apiVidgames];
        apiData = await axios.get(apiData.data.next);
      }
      // let apiData = await axios.get(
      //   `https://api.rawg.io/api/games?key=${APIKEY}`
      // );

      // const apiGames = apiData.data.results.map((game) => {
      //   return {
      //     id: game.id,
      //     name: game.name,
      //     background_image: game.background_image,

      //     genres: game.genres.map((g) => g.name),
      //   };
      // });
      // console.log(apiGames);

      // const videogames = await Videogame.findAll({
      //   attributes: ["name"],
      //   include: [{ model: Genre, attributes: ["name"] }],
      // });
      // videogames = JSON.stringify(videogames);
      // videogames = JSON.parse(videogames);

      // videogames = videogames.reduce(
      //   (acc, el) =>
      //     acc.concat({
      //       ...el,
      //       genres: el.genres.map((g) => g.name),
      //     }),
      //   []
      // );

      //Otra forma de convertir el array de objetos  genres en genres.name

      // videogames = videogames.map((g) => {
      //   return { ...g, genres: el.genres.map((g) => g.name) };
      // });
      let hundredGames = allGames.slice(0, 100);
      return res.status(201).json(hundredGames);
    } else {
      const { name } = req.query;

      // let filtVidgamesDB = await Videogame.findAll({
      //   where: {
      //     name: {
      //       [Op.substring]: name.toLowerCase(),
      //     },
      //   },
      //   include: Genre,
      // });

      let apiData = await axios.get(
        `https://api.rawg.io/api/games?search=${name}&key=${APIKEY}`
      );
      if (!apiData.data.count)
        return res
          .status(404)
          .send("No se encontro ningun juego con ese nombre");

      let apiVidgames = apiData.data.results.map((game) => {
        return {
          name: game.name,
          image: game.background_image,
          genres: game.genres.map((g) => g.name),
        };
      });

      let filtVidgamesDB = vidgamesDB.filter((g) =>
        g.name.toLowerCase().includes(name.toLowerCase())
      );

      let foundGames = [...filtVidgamesDB, ...apiVidgames].slice(0, 15);

      if (!foundGames.length)
        return res
          .status(404)
          .send("No se encontro ningun juego con ese nombre");

      // const videogames = await Videogame.findAll(
      //   {
      //     where: {
      //       name: {
      //         [Op.substring]: name,
      //       },
      //     },
      //   },
      //   { limit: 15 }
      // );
      // if (!videogames.length)
      //   res.status(404).send("No se encontraron videojuegos con ese nombre");
      return res.status(201).send(foundGames);
    }
  } catch (error) {
    res.status(404).send(error.message);
  }
});
/////////////

router.post("/", async (req, res) => {
  const { name, description, platforms, rating, released, genres } = req.body;
  if (!name || !description || !platforms)
    res.status(404).send("Faltan datos obligatorios");
  try {
    const newVideogame = await Videogame.create({
      name,
      description,
      platforms,
      rating,
      released,
    });

    //buscar el genero por el lado del nombre
    // q llegan por nombrre, recorrerlos por foreach q solo recoprre y no devuelve nada igualar a un await buscando los generos, una vez obtenidos
    await newVideogame.addGenre(genres);
    return res.status(201).send("Videojuego agregado con exito");
  } catch (error) {
    res.status(404).send(error.message);
  }
});

module.exports = router;
