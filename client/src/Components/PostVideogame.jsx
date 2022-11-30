import React, { useEffect } from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { postVideogame, getGenres, getPlatforms } from "../actions";
import { NavLink } from "react-router-dom";
import "./PostVideogame.css";

const PostVideogame = () => {
  const dispatch = useDispatch();
  const videogames = useSelector((state) => state.videogames);
  const genres = useSelector((state) => state.genres);
  const platforms = useSelector((state) => state.platforms);

  useEffect(() => {
    dispatch(getGenres());
    dispatch(getPlatforms());
  }, [dispatch]);

  let genresNames = genres?.map((g) => g.name);
  let sortGenreNames = genresNames.sort();

  const validate = (input) => {
    let errors = {};
    if (!input.name) {
      errors.name = "Nombre de videojuego requerido";
    }
    // const found = videogames.find((g) => g.name === input.name);
    // if (found) {
    //   errors.name = "El nombre de juego ingresado ya existe";
    // }
    if (!input.description) {
      errors.description = "Descripción de videojuego requerida";
    }
    if (!input.platforms.length) {
      errors.platforms = "Al menos una plataforma de videojuego requerida";
    }
    if (input.rating && !/^[1-5]$/.test(input.rating)) {
      errors.rating = "El rating debe ser un numero menor a 5";
    }
    return errors;
  };

  const [input, setInput] = useState({
    name: "",
    description: "",
    released: "",
    rating: 0,
    image: "",
    genres: [],
    platforms: [],
  });

  const [errors, setErrors] = useState({
    name: "",
    description: "",
    platforms: "",
    rating: "",
  });

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(postVideogame(input));
    // setInput({
    //   name: "",
    //   description: "",
    //   released: "",
    //   rating: "",
    //   image: "",
    //   genres: [],
    //   platforms: [],
    // });
  };

  const changeHandler = (e) => {
    let name = e.target.name;
    let value = e.target.value;
    setInput({ ...input, [name]: value });
    setErrors(validate({ ...input, [name]: value }));
  };

  const selectHandler = (e) => {
    let name = e.target.name;
    let value = e.target.value;
    e.preventDefault();
    if (!input[name].includes(value)) {
      setInput({ ...input, [name]: input[name].concat(value) });
    }
    console.log(input[name]);
  };

  const deleteFromList = (e) => {
    let value = e.target.value;
    if (input.platforms.indexOf(value) !== -1) {
      setInput({
        ...input,
        platforms: input.platforms.filter((p) => p !== value),
      });
    } else if (input.genres.indexOf(value) !== -1) {
      setInput({
        ...input,
        genres: input.genres.filter((p) => p !== value),
      });
    }
  };

  return (
    <div>
      <h3>Crea tu videojuego</h3>
      <form
        action=""
        onSubmit={(e) => {
          submitHandler(e);
        }}
      >
        <div>
          <label htmlFor="">Nombre*: </label>
          <input
            type="text"
            name="name"
            value={input.name}
            onChange={changeHandler}
            className={errors.name && "danger"}
          />
          {errors.name && <p className="danger">{errors.name}</p>}
        </div>

        <div>
          <label htmlFor="">Fecha de lanzamiento: </label>
          <input
            type="text"
            name="released"
            value={input.released}
            onChange={changeHandler}
          />
        </div>
        <div>
          <label htmlFor="">Rating: </label>
          <input
            type="text"
            name="rating"
            value={input.rating}
            onChange={changeHandler}
            className={errors.rating && "danger"}
          />
          {errors.rating && <p className="danger">{errors.rating}</p>}
        </div>
        <div>
          <label htmlFor="">URL de imagen: </label>
          <input
            type="text"
            name="image"
            value={input.image}
            onChange={changeHandler}
          />
        </div>
        <div>
          <label for="platforms">Plataformas*: </label>
          <select
            id="platforms"
            name="platforms"
            value={input.platforms}
            onChange={selectHandler}
            className={errors.platforms && "danger"}
          >
            <option>...</option>
            {platforms?.map((p) => {
              return (
                <option key={p} value={p}>
                  {p}
                </option>
              );
            })}
          </select>
          {errors.platforms && <p className="danger">{errors.platforms}</p>}
        </div>
        <div>
          <label for="genres">Géneros: </label>
          <select
            id="genres"
            name="genres"
            value={input.genres}
            onChange={selectHandler}
          >
            <option>...</option>
            {sortGenreNames?.map((g) => {
              return (
                <option key={g} value={g}>
                  {g}
                </option>
              );
            })}
          </select>
        </div>
        <div>
          <label htmlFor="">Descripción*: </label>
          <textarea
            type="text"
            name="description"
            value={input.description}
            onChange={changeHandler}
            className={errors.description && "danger"}
          />
          {errors.description && <p className="danger">{errors.description}</p>}
        </div>
        <div>
          {input.genres.length > 0 && <p>Géneros seleccionados: </p>}
          {input.genres?.map((g) => {
            return (
              <div>
                <p>{g}</p>
                <button key={g} value={g} onClick={deleteFromList}>
                  X
                </button>
              </div>
            );
          })}
        </div>
        <div>
          {input.platforms.length > 0 && <p>Plataformas seleccionados:</p>}
          {input.platforms?.map((p) => {
            return (
              <div>
                <p>{p}</p>
                <button key={p} value={p} onClick={deleteFromList}>
                  X
                </button>
              </div>
            );
          })}
        </div>

        <button
          type="submit"
          disabled={
            !input.name || !input.description || !input.platforms.length
          }
        >
          Crear
        </button>
      </form>

      <NavLink to="/home">
        <button>Volver</button>
      </NavLink>
    </div>
  );
};

export default PostVideogame;
