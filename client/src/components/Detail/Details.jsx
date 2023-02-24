import React from "react";
import { Link,useParams} from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getDetail } from "../../redux/actions";



import "./Details.css";


//   const dispatch = useDispatch();



//   useEffect(() => {
  //     dispatch(getDetail(props.match.params.id));
  //   }, [dispatch, props.match.params.id]);
  
  
  // const {id} = useParams()
  // const history = useHistory()
  
  // const handlerDelete = () => {
    //   dispatch(deletePoke(id))
    //   alert("Pokemon Delete!")
    //   history.push("/home")
    //   dispatch(getPokemones)
    // }
    export default function Details(){
      const pokemon = useSelector((state) => state.detail);
    const dispatch = useDispatch();
  
  const { id } = useParams();
  
  useEffect(() => {
    dispatch(getDetail(id));
  }, []);
  
  

 

  return (
    <>
    <div id={"contenedor"}>
      <div className="title1">
        <br />
        <h1>Pokemon Card</h1>
      </div>
      <br />
      <div>
        {pokemon.name ? (
          <h2 style={{ color: "white" }}>{pokemon.name.toUpperCase()}</h2>
        ) : (
          <img
            src="https://media.baamboozle.com/uploads/images/125978/1629738053_29014_gif-url.gif"
            alt="imagen"
          />
        )}
      </div>

      <div className="container">
        <Link to="/home">
          <button className="btnBack">🔙</button>
        </Link>

        {/* <button onClick={(e) => handlerDelete(e)} className="btnEliminar"> 🗑️</button> */}
        

        {pokemon.name ? (
          <div lassName="card">
            <h2>IDº {pokemon.id}</h2>
            {pokemon.img ? (
              <img
                className="img"
                src={pokemon.img}
                alt="No se pudo cargar la imagen"
              />
            ) : (
              <img
                className="img"
                src={"https://cdn.memegenerator.es/descargar/31466993"}
                alt="no hay imagen"
              />
            )}
            <h2 className="boxTypes">Type: {" " + pokemon.type.map(x=>x) + " "}</h2>
            <p className="boxContainer">
              <div>
                <h3>Attack: {pokemon.attack}</h3>
                <h3>Defense: {pokemon.defense}</h3>
                <h3>Speed: {pokemon.speed}</h3>
              </div>
              <div className="box2">
                <h3>Hp: {pokemon.hp}</h3>
                <h3>Weight: {pokemon.weight}</h3>
                <h3>Height: {pokemon.height}</h3>
              </div>
            </p>
          </div>
        ) : (
          <h4>Wait a second... </h4>
        )}
      </div>
    </div>
    </>
  );
}