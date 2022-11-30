import React from "react";
import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { getVideogameByName } from "../actions";

export default function Searchbar({ videogames }) {
  const [name, setName] = useState("");
  const dispatch = useDispatch();

  // useEffect(() => {
  //   setName("");
  // }, [videogames]);

  const searchHandler = (e) => {
    e.preventDefault();
    setName(e.target.value);
  };
  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(getVideogameByName(name));
  };
  return (
    <div>
      <input
        value={name}
        placeholder="Nombre de juego..."
        onChange={(e) => searchHandler(e)}
        type="text"
      />
      <button type="submit" onClick={(e) => submitHandler(e)}>
        Buscar
      </button>
    </div>
  );
}
