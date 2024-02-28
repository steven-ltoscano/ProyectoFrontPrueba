import React from 'react';

const Inicio = ({ iniciarJuego }) => {
  return (
    <div>
      <h1>Bienvenido al Juego de Piedra, Papel o Tijera</h1>
      <button onClick={iniciarJuego}>Iniciar Juego</button>
    </div>
  );
}

export default Inicio;
