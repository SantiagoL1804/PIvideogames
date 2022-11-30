import axios from "axios";

export const GET_VIDEOGAMES = "GET_VIDEOGAMES";
export const GET_VIDEOGAME_DETAIL = "GET_VIDEOGAME_DETAIL";
export const GET_GENRES = "GET_GENRES";
export const GET_PLATFORMS = "GET_PLATFORMS";
export const POST_VIDEOGAME = "POST_VIDEOGAME";
export const CLEAN_VIDEOGAME_DETAIL = "CLEAN_VIDEOGAME_DETAIL";
export const GET_VIDEOGAMES_BY_NAME = "GET_VIDEOGAMES_BY_NAME";
export const SORT_VIDEOGAMES = "SORT_VIDEOGAMES";
export const FILTER_BY_GENRE = "FILTER_BY_GENRE";
export const FILTER_BY_API_OR_CREATED = "FILTER_BY_API_OR_CREATED";

//--ACCIONES GET--

export const getVideogames = () => {
  return async function (dispatch) {
    let data = await axios.get("http://localhost:3001/videogames");

    return dispatch({ type: GET_VIDEOGAMES, payload: data.data });
  };
};

export const getVideogameDetail = (id) => {
  return async function (dispatch) {
    let data = await axios.get(`http://localhost:3001/videogame/${id}`);

    return dispatch({ type: GET_VIDEOGAME_DETAIL, payload: data.data });
  };
};

export const getVideogameByName = (name) => {
  return async function (dispatch) {
    let data = await axios.get(`http://localhost:3001/videogames?name=${name}`);

    return dispatch({ type: GET_VIDEOGAMES_BY_NAME, payload: data.data });
  };
};

export const getGenres = () => {
  return async function (dispatch) {
    let data = await axios.get("http://localhost:3001/genres");

    return dispatch({ type: GET_GENRES, payload: data.data });
  };
};

export const getPlatforms = () => {
  return async function (dispatch) {
    let data = await axios.get("http://localhost:3001/platforms");

    return dispatch({ type: GET_PLATFORMS, payload: data.data });
  };
};

//--ACCIONES POST--

export const postVideogame = (game) => {
  return async function () {
    try {
      let postedGame = await axios.post(
        "http://localhost:3001/videogames",
        game
      );

      return postedGame;
    } catch (error) {
      console.log(error);
    }
  };
};

//--ACCIONES CLEAN O DELETE--

export const cleanDetail = () => {
  return { type: CLEAN_VIDEOGAME_DETAIL };
};

//--ACCIONES FILTER Y SORT--

export const sortVideogames = (payload) => {
  return { type: SORT_VIDEOGAMES, payload };
};

export const filterByGenre = (payload) => {
  return { type: FILTER_BY_GENRE, payload };
};

export const filterByApiOrCreated = (payload) => {
  return { type: FILTER_BY_API_OR_CREATED, payload };
};
