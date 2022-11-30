import React from "react";
import "./Home.css";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getVideogames,
  sortVideogames,
  getGenres,
  filterByGenre,
  filterByApiOrCreated,
} from "../actions";
import Card from "./Card";
import { NavLink } from "react-router-dom";
import Paginado from "./Paginado";
import Searchbar from "./Searchbar";

export default function Home(props) {
  const [games, setGames] = useState();
  const [order, setOrder] = useState("");
  const dispatch = useDispatch();
  const videogames = useSelector((state) => state.videogames);
  const genres = useSelector((state) => state.genres);

  const [currentPage, setCurrentPage] = useState(1);
  const [gamesPerPage, setGamesPerPage] = useState(15);
  const indexLastGame = currentPage * gamesPerPage;
  const indexFirstGame = indexLastGame - gamesPerPage;
  const currentGames = videogames.slice(indexFirstGame, indexLastGame);

  const paginado = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  // const videogamesPosted = useSelector((state) => state.videogamesPosted);
  let genresNames = genres?.map((g) => g.name);
  let sortGenreNames = genresNames.sort();

  useEffect(() => {
    setGames(videogames);
    dispatch(getGenres());

    dispatch(getVideogames());
  }, [dispatch, games]);

  const clickhandler = (e) => {
    e.preventDefault();
    dispatch(getVideogames());
  };

  const sortHandler = (e) => {
    e.preventDefault();
    dispatch(sortVideogames(e.target.value));
    setCurrentPage(1);
    setOrder(`Ordenado ${e.target.value}`);
  };

  const filterHandlerGenre = (e) => {
    dispatch(filterByGenre(e.target.value));
  };
  const filterCreated = (e) => {
    dispatch(filterByApiOrCreated(e.target.value));
  };

  return (
    <div>
      <h1>Videojuegos</h1>
      <NavLink to="/create">
        <h3>Crear juego</h3>
      </NavLink>
      <Searchbar videogames={videogames}></Searchbar>
      <button onClick={clickhandler}>Refrescar juegos</button>
      <select onChange={(e) => sortHandler(e)} name="" id="">
        <option>Orden</option>
        <option value="asc">a - z</option>
        <option value="desc">z - a</option>
      </select>
      <select onChange={(e) => filterHandlerGenre(e)} name="" id="">
        <option value="All">Todos</option>
        {sortGenreNames?.map((g) => {
          return <option value={`${g}`}>{g}</option>;
        })}
      </select>
      <select onChange={(e) => filterCreated(e)} name="" id="">
        <option value="All">Todos</option>
        <option value="api">Existentes</option>
        <option value="created">Creados</option>
      </select>

      <Paginado
        videogames={videogames.length}
        gamesPerPage={gamesPerPage}
        paginado={paginado}
      ></Paginado>

      <div className="cardsContainer">
        {/* {videogamesPosted?.map((game) => {
          return (
            <Card
              name={game.name}
              image={game.image}
              genres={game.genres}
              key={game.id}
              id={game.id}
            />
          );
        })} */}
        {currentGames?.map((game) => {
          return (
            <Card
              name={game.name}
              image={game.img ? game.img : game.image}
              genres={game.genres}
              key={game.id}
              id={game.id}
            />
          );
        })}
      </div>
      <Paginado
        videogames={videogames.length}
        gamesPerPage={gamesPerPage}
        paginado={paginado}
      ></Paginado>
    </div>
  );
}
