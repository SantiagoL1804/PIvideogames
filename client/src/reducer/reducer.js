import {
  GET_VIDEOGAMES,
  GET_VIDEOGAME_DETAIL,
  POST_VIDEOGAME,
  CLEAN_VIDEOGAME_DETAIL,
  GET_GENRES,
  SORT_VIDEOGAMES,
  GET_PLATFORMS,
  FILTER_BY_GENRE,
  FILTER_BY_API_OR_CREATED,
  GET_VIDEOGAMES_BY_NAME,
} from "../actions";

const initialState = {
  videogames: [],
  allVideogames: [],
  genres: [],
  videogameDetail: {},
  platforms: [],
};

const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_VIDEOGAMES:
      return {
        ...state,
        videogames: action.payload,
        allVideogames: action.payload,
      };
    case GET_VIDEOGAME_DETAIL:
      return { ...state, videogameDetail: action.payload };
    case GET_GENRES:
      return { ...state, genres: action.payload };
    case GET_VIDEOGAMES_BY_NAME:
      return {
        ...state,
        videogames: action.payload,
      };
    case GET_PLATFORMS:
      return { ...state, platforms: action.payload };
    case POST_VIDEOGAME:
      return { ...state };
    case CLEAN_VIDEOGAME_DETAIL:
      return { ...state, videogameDetail: {} };
    case SORT_VIDEOGAMES:
      const sortedGames =
        action.payload === "asc"
          ? state.videogames.sort((a, b) => {
              let fa = a.name.toLowerCase(),
                fb = b.name.toLowerCase();

              if (fa < fb) {
                return -1;
              }
              if (fa > fb) {
                return 1;
              }
              return 0;
            })
          : state.videogames.sort((a, b) => {
              let fa = a.name.toLowerCase(),
                fb = b.name.toLowerCase();

              if (fa > fb) {
                return -1;
              }
              if (fa < fb) {
                return 1;
              }
              return 0;
            });
      return {
        ...state,
        videogames: sortedGames,
      };
    case FILTER_BY_GENRE:
      const allVideogames = state.allVideogames;
      const filteredVideogames =
        action.payload === "All"
          ? allVideogames
          : allVideogames.filter((g) => g.genres.includes(action.payload));
      return {
        ...state,
        videogames: filteredVideogames,
      };

    case FILTER_BY_API_OR_CREATED:
      const createdOrApi =
        action.payload === "created"
          ? state.allVideogames.filter((g) => g.createdInDb)
          : state.allVideogames.filter((g) => !g.createdInDb);
      return {
        ...state,
        videogames:
          action.payload === "All" ? state.allVideogames : createdOrApi,
      };
    default:
      return { ...state };
  }
};

export default rootReducer;
