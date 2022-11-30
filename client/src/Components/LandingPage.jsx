import React from "react";
import { NavLink } from "react-router-dom";

export default function LandingPage() {
  return (
    <div>
      <h1>Bienvenidos</h1>
      <NavLink to="/home">
        <h3>Press Start to continue</h3>
      </NavLink>
    </div>
  );
}
