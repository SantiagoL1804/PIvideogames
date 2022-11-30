import React from "react";
import "./Paginado.css";

export default function Paginado({ videogames, gamesPerPage, paginado }) {
  const pageNumber = [];
  for (let i = 0; i < Math.ceil(videogames / gamesPerPage); i++) {
    pageNumber.push(i + 1);
  }
  return (
    <nav>
      <ul className="numeros">
        {pageNumber?.map((p) => {
          return (
            <li key={p} className="numero">
              <a onClick={() => paginado(p)}>{p}</a>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
