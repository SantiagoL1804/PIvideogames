import React from "react";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getVideogameDetail, cleanDetail } from "../actions";

export default function Detail(props) {
  const dispatch = useDispatch();
  const detail = useSelector((state) => state.videogameDetail);
  console.log(detail);
  useEffect(() => {
    dispatch(getVideogameDetail(props.match.params.id));

    return function () {
      dispatch(cleanDetail());
    };
  }, []);
  return (
    <div>
      <h1>Detalles de juego</h1>
      <div>
        <h3>{detail.name}</h3>
        <img
          src={
            detail.image
              ? detail.image
              : "https://assets-prd.ignimgs.com/2021/12/30/36190303-image-7-1640880187142.png"
          }
          alt="Imagen de juego detalle"
        />
        <ul>
          {detail.genres?.map((g) => (
            <li>{g}</li>
          ))}
        </ul>
        <p>{detail.description}</p>
        <p>{detail.rating}</p>
        <p>{detail.released}</p>
        <ul>
          {detail.platforms?.map((p) => (
            <li>{p}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}
