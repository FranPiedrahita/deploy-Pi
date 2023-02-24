// Carta individual
// Nombre , img y tipo


import React from "react";

import "./Card.css";

export default function Card({ name, img, type }) {
  

  return (
    
    <div className="cardPoke">
      <div className="cardPoke-title">
        <h4>{name}</h4>
      </div>
      <div className="imgCard">
        {img ? (
          <img src={img} alt="pokemonImg" />
        ) : (
          <img
            src="https://cdn.dribbble.com/users/1081076/screenshots/2832850/pokemongo.gif"
            alt="No se pudo cargar la imagen"
          />
        )}
      </div>

      <div className="cardPoke-description">
      <br/>
        <h4>
          {type?.map((e) => (
          <div>
          <span>{e + " "}</span>
          </div>
          ))}
        </h4>
      </div>
    </div>
  );
}