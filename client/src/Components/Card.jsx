import React from "react";
import "./Card.css";
import { NavLink } from "react-router-dom";

export default function Card({ name, image, genres, key, id }) {
  return (
    <div className="card" key={key}>
      <NavLink to={`/gameDetail/${id}`}>
        <h2>{name}</h2>
      </NavLink>
      <img
        className="cardImage"
        src={
          image
            ? image
            : "https://assets-prd.ignimgs.com/2021/12/30/36190303-image-7-1640880187142.png"
        }
        alt="Imagen juego"
      />
      <ul>
        {genres?.map((genre) => (
          <li>{genre}</li>
        ))}
      </ul>
    </div>
  );
}
