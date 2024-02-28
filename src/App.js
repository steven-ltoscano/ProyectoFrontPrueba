import React, { useState } from 'react';
import './App.css';
import rockImg from './Assets/rock.png';
import paperImg from './Assets/paper.png';
import scissorsImg from './Assets/scissors.png';
import axios from 'axios';

const choices = ["Piedra", "Papel", "Tijeras"];
const backURL = "https://proyectoserver20240228134952.azurewebsites.net/api/ControladorJuego";

const Inicio = ({ onStart }) => {
  return (
    <div className="centered">
      <h1>Bienvenido al Juego de Piedra, Papel o Tijeras</h1>
      <button className='estilo-boton' onClick={onStart}>Comenzar Juego</button>
    </div>
  );
}

const App = () => {
  const [selected1, setSelected1] = useState("");
  const [selected2, setSelected2] = useState("");
  const [puntosP1, setPuntosP1] = useState(0);
  const [puntosP2, setPuntosP2] = useState(0);
  const [resultado, setResultado] = useState('');
  const [juegoIniciado, setJuegoIniciado] = useState(false);

  const reiniciarJuego = () => {
    setSelected1("");
    setSelected2("");
    setPuntosP1(0);
    setPuntosP2(0);
    setResultado('');
  };

  const cambiarValorP1 = (valor) => {
    setSelected1(valor);
  }

  const cambiarValorP2 = (valor) => {
    setSelected2(valor);
  }

  const handleStartGame = () => {
    setJuegoIniciado(true);
  };

  const jugar = async () => {
    const data = { p1: selected1, p2: selected2 };

    try {

      const response = await axios.post(`${backURL}?p1=${data.p1}&p2=${data.p2}`);

      const resultado = response.data;
      setResultado(resultado);
      
    } catch (error) {
      console.error('Error inesperado:', error);
      setResultado("Error inesperado a la hora de hacer la petición.");
    }

  };
  

  return (
    <div className="app">
      {!juegoIniciado ? (
        <Inicio onStart={handleStartGame} />
      ) : (
        <div>
          <div className='centered'>
            <div className='column left'>
            <p>Jugador 1 ha elegido: <b>{selected1}</b></p>
            <p>Veces ganadas por el jugador 1: <b>{puntosP1}</b></p>
          </div>
          <div className="column">
            <div><h1>Jugador 1</h1></div>
            <div>
                <button onClick={() => cambiarValorP1(choices[0])}>
                  <img src={rockImg} alt={choices[0]}/></button>
              </div>
              <div>
                <button onClick={() => cambiarValorP1(choices[1])}>
                  <img src={paperImg} alt={choices[1]}/></button>
              </div>
              <div>
                <button onClick={() => cambiarValorP1(choices[2])}>
                  <img src={scissorsImg} alt={choices[2]}/></button>
              </div>
          
          </div>
          <div className='column separador'></div>
          <div className="column">
            <div><h1>Jugador 2</h1></div>
              <div>
                <button onClick={() => cambiarValorP2(choices[0])}>
                  <img src={rockImg} alt={choices[0]}/></button>
              </div>
              <div>
                <button onClick={() => cambiarValorP2(choices[1])}>
                  <img src={paperImg} alt={choices[1]}/></button>
              </div>
              <div>
                <button onClick={() => cambiarValorP2(choices[2])}>
                  <img src={scissorsImg} alt={choices[2]}/></button>
              </div>
          </div>
          <div className='column right'>
            <p>Jugador 2 ha elegido: <b>{selected2}</b></p>
            <p>Veces ganadas por el jugador 2: <b>{puntosP2}</b></p>
          </div>
          </div>
          <div className='centered'>
            <button className="estilo-boton" onClick={() => puntosP1 === 3 || puntosP2 === 3 ? reiniciarJuego() : jugar()}>
              {puntosP1 === 3 || puntosP2 === 3 ? 'Reiniciar' : 'JUGAR'}
            </button>
            <div><h3>{resultado}</h3></div>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;