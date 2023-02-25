import React, { useEffect, useState } from "react"; // SIMULA LOS ESTADOS DE VIDA DEL COMPONENTE
import { useSelector, useDispatch } from "react-redux"; //HOOK. SELECCIONA DESDE NUESTRO STORE UNO DE LOS ESTADOS
import Card from "../Card/Card";
import { Link } from "react-router-dom";
import { getPokemones } from "../../redux/actions";
import "./Cards.css";
import Loading from "../Loading/Loading";
import Paginado from "../Paginado/Paginado";
import Error from "../Error/Error";
import AboutMe from "../About/About";
import Filtros from "../Filtros/Filtros";
import NavBar from "../NavBar/NavBar";
import { miFiltro } from "../../redux/libreria";

export default function Cards() {
  let statePoke = useSelector((state) => state.pokemones);
  const [loading, setLoading] = useState(true);

  const dispatch = useDispatch();
  const allFilter = useSelector((state) => state.optionFilter);
  const paginaActual = useSelector((state) => state.inicialpage);
  // useEffect(() => {
  //   setTimeout(() => {
  //     setLoading(false);
  //   }, 6000);
  // }, []);
  
  useEffect(() => {
    dispatch(getPokemones(()=> setLoading(false)));
  }, [dispatch]);
  const misPokemonsfiltrados = miFiltro(allFilter, statePoke);
  
  
  
  const indexOfLastPokes = paginaActual * 12; // 15
  const indexOfFirstPoke = indexOfLastPokes - 12; // 0

  // const currentPokes = misPokemonsfiltrados.slice( indexOfFirstPoke, indexOfLastPokes);
const handlerRestaurar = (e) =>{
    dispatch(getPokemones(()=> setLoading(false)));
}

  return (
    <>
      <NavBar />
      <button onClick={(e)=>handlerRestaurar(e)} className="Recarga">Restaurar</button>
      <Filtros />
      <Paginado allPokemones={misPokemonsfiltrados.length} />
      <br />
      {console.log(paginaActual, indexOfLastPokes)}
      <div className="cards">
        {loading ? (
          <div>
            <div>
              <Loading />
            </div>
          </div>
        ) : !misPokemonsfiltrados.length ? (
          <Error />
        ) : (
          misPokemonsfiltrados.slice(indexOfFirstPoke, indexOfLastPokes).map((p) => (
              <Link className="cardDetail" key={p.id} to={`/details/${p.id}`}>
                <Card name={p.name} img={p.img} type={p.type} />
              </Link>
            ))
        )}
        <div className="cards">
          {loading ? (
            <div>
              <div>
                <Loading />
              </div>
            </div>
          ) : (
            <AboutMe />
          )}
        </div>
      </div>
    </>
  );
}
