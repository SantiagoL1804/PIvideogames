const { Router } = require("express");
require("dotenv").config();
const router = Router();
const axios = require("axios");
const APIKEY = process.env.YOUR_API_KEY;

router.get("/", async (req, res) => {
  try {
    let apiData = await axios.get(
      `https://api.rawg.io/api/games?key=${APIKEY}`
    );
    let platNames = [];
    let platforms = [];
    let pages = 0;
    while (platforms.length <= 150) {
      pages++;
      let apiPlatforms = apiData.data.results.map((game) => {
        let platNames = game.platforms.map((p) => p.platform.name);
        let platformsArr = [...platNames];
        return platformsArr;
      });
      for (var i = 0; i < apiPlatforms.length; i++) {
        for (var j = 0; j < apiPlatforms[i].length; j++) {
          platNames.push(apiPlatforms[i][j]);
        }
      }

      // platforms.concat(platNames);
      platforms = [...platforms, ...platNames];

      apiData = await axios.get(apiData.data.next);
    }
    const uniquePlatforms = [...new Set(platforms)];
    console.log(uniquePlatforms);
    return res.status(201).json(uniquePlatforms);
  } catch (error) {
    res.status(404).send(error.message);
  }
});
/////////////

module.exports = router;
