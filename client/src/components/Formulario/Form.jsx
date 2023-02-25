import React from "react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getTypes, createPoke } from "../../redux/actions";
import { Link, useHistory } from "react-router-dom";

import "./Form.css";

export default function CreatePokemon() {
  const history = useHistory();

  let [input, setInput] = useState({
    name: "",
    hp: "",
    attack: "",
    defense: "",
    speed: "",
    height: "",
    weight: "",
    img: "",
    types: [],
  });

  const dispatch = useDispatch();

  const tipos = useSelector((state) => state.types);

  let [error, setError] = useState({});

  let [disEna, setDisEna] = useState(false);

  useEffect(() => {
    dispatch(getTypes());
  }, [dispatch]);

  const handleOnChange = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
    setError(validaciones({ ...input, [e.target.name]: e.target.value }));

    handleDisable(validaciones({ ...input, [e.target.name]: e.target.value }));

    validaciones({ ...input, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    dispatch(createPoke(input));

    setInput({
      name: "",
      hp: "",
      attack: "",
      defense: "",
      speed: "",
      height: "",
      weight: "",
      img: "",
      types: [],
    });

    alert("¡Pokemon created!");
    history.push("/home");
  };

  const handleTypes = (e) => {
    if (!input.types.includes(e.target.value)) {
      setInput({ ...input, types: [...input.types, e.target.value] });
      setError(
        validaciones({ ...input, types: [input.types, e.target.value] })
      );

    handleDisable(validaciones({...input, types: [input.types, e.target.value]}))
      validaciones({ ...input, types: [...input.types, e.target.value] });
    } else {
      alert("El tipo ya fue seleccionado.");
    }
  };

  const validaciones = (pokeValidar) => {
    let validError = {};

    if (!pokeValidar.name) {
      validError.name = "Debe tener un nombre";
    } else {
      if (/\s/.test(pokeValidar.name)) {
        validError.name = "No se permiten espacios";
      }
      if (/[0-9]/.test(pokeValidar.name)) {
        validError.name = "Solo letras por favor";
      }
      if (/\W/.test(pokeValidar.name)) {
        validError.name = "No se permiten carácteres especiales";
      }
    }
    if (!pokeValidar.attack) {
      validError.attack = "Necesita tener ataque";
    } else {
      if (pokeValidar.attack > 255) {
        validError.attack = "El ataque no puede ser mayor a 255";
      } else if (pokeValidar.attack < 1) {
        validError.attack = "No puede ser un numero negativo";
      }
    }
    if (!pokeValidar.defense) {
      validError.defense = "Necesita una defensa";
    } else {
      if (pokeValidar.defense > 255) {
        validError.defense = "La defensa no puede ser mayora a 255";
      } else if (pokeValidar.defense < 1) {
        validError.defense = "Tiene que ser mayor a 1 ";
      }
    }
    if (!pokeValidar.speed) {
      validError.speed = "Necesita velocidad";
    } else {
      if (pokeValidar.speed > 255) {
        validError.speed = "La velocidad no puede ser mayora a 255";
      } else if (pokeValidar.speed < 1) {
        validError.speed = "Debe ser mayor a 1";
      }
    }
    if (!pokeValidar.hp) {
      validError.hp = "Debe tener vida";
    } else {
      if (pokeValidar.hp > 255) {
        validError.hp = "La vida no puede ser mayora a 255";
      } else if (pokeValidar.hp < 1) {
        validError.hp = "La vida debe ser mayor a 1";
      }
    }
    if (!pokeValidar.height) {
      validError.height = "Algo esta mal ...";
    } else {
      if (pokeValidar.height > 40) {
        validError.height = "La altura no puede superar los 40 metros";
      } else if (pokeValidar.height < 1) {
        validError.height = "Algo esta mal ...";
      }
    }
    if (!pokeValidar.weight) {
      validError.weight = "Algo esta mal ...";
    } else {
      if (pokeValidar.weight > 1000) {
        validError.weight = "El peso no puede ser superior a 1000";
      } else if (pokeValidar.weight < 1) {
        validError.weight = "Algo esta mal ...";
      }
    }
    // if (pokeValidar.img) {
    if (
      !/(http)?s?:?(\/\/[^"']*\.(?:png|jpg|jpeg|gif|png|svg))/.test(
        pokeValidar.img
      )
    ) {
      validError.img = "El link de la imagen debe ser una URL";
    }

    if ( pokeValidar.types.length === 0 || pokeValidar.types.length >= 3) {
      validError.types = "Debe tener un maximo de 2 tipos!";
    }

    setError(validError);
    handleDisable(validError);
  };

  const handleDisable = (error) => {
    if (
      error?.name === undefined &&
      error?.attack === undefined &&
      error?.defense === undefined &&
      error?.speed === undefined &&
      error?.hp === undefined &&
      error?.height === undefined &&
      error?.weight === undefined &&
      error?.types === undefined &&
      error?.img === undefined
    ) {
      setDisEna(true);
    } else {
      setDisEna(false);
    }
  };

  const handleDelete = (e) => {
    const tipoID = input.types.filter(((type) => type !== e))
    setInput({...input, types: tipoID });
    setDisEna(tipoID.length !== 0 )
    
   
  };


  return (
    <div className="form">
      <div className="container">
        <button class="back-button">
          <Link className="back-button" to="/home">
            { <svg width="24" height="24" viewBox="0 0 24 24">
              <path d="M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20v-2z" />
            </svg> }
            🔙
          </Link>
        </button>
        <h2>Diseña Tu Pokemon</h2>

        <br />
        <form onSubmit={(e) => handleSubmit(e)} className="form">
          <div className="input">
            <label>Name: </label>
            <input
              type={"text"}
              placeholder={"Give it a name!"}
              name={"name"}
              value={input.name}
              onChange={(e) => handleOnChange(e)}
            />
            <p>{error.name}</p>
            <br />
          </div>

          <div className="input">
            <label>Imagen: </label>
            <label>
              <input
                type={"text"}
                placeholder={"Put a url!"}
                name={"img"}
                value={input.img}
                onChange={(e) => handleOnChange(e)}
              />
            </label>
            <br />
            <br />
            <br />
            <img
              style={{ height: "400px", width: "450px" }}
              src={
                input.img
                  ? input.img
                  : "https://c4.wallpaperflare.com/wallpaper/741/482/515/pokemon-wallpaper-preview.jpg"
              }
              alt="img"
            ></img>
            <p>{error.img}</p>
          </div>
          <h3>Datos</h3>

          <div className="atributos">
            <label>Attack: </label>
            { <input type={'number'} placeholder={'Ej: 40'} name={'attack'} value={input.attack} onChange={ (e) => handleOnChange(e)}/> }
            <input
              type={"range"}
              min="1"
              max="255"
              name={"attack"}
              value={input.attack}
              onChange={(e) => handleOnChange(e)}
            />
            <p>{input.attack}</p>
            <p>{error.attack}</p>
            <br />

            <label>Defense: </label>
            { <input type={'number'} placeholder={'Ej: 65'} name={'defense'} value={input.defense} onChange={ (e) => handleOnChange(e)}/> }
            <input
              type={"range"}
              min="1"
              max="255"
              name={"defense"}
              value={input.defense}
              onChange={(e) => handleOnChange(e)}
            />
            <p>{input.defense}</p>
            <p>{error.defense}</p>

            <br />

            <label>Speed: </label>
            { <input type={'number'} placeholder={'Ej: 55'} name={'speed'} value={input.speed} onChange={ (e) => handleOnChange(e)}/> }
            <input
              type={"range"}
              min="1"
              max="255"
              name={"speed"}
              value={input.speed}
              onChange={(e) => handleOnChange(e)}
            />
            <p>{input.speed}</p>
            <p>{error.speed}</p>

            <br />
          </div>
          <div className="atributos2">
            <label>Hp: </label>
            { <input type={'number'} placeholder={'Ej: 70'} name={'hp'} value={input.hp} onChange={ (e) => handleOnChange(e)}/> }
            <input
              type={"range"}
              min="1"
              max="255"
              name={"hp"}
              value={input.hp}
              onChange={(e) => handleOnChange(e)}
            />
            <p>{input.hp}</p>
            <p>{error.hp}</p>

            <br />

            <label>Weight: </label>
            <label>
              <input
                type={"number"}
                placeholder={" 1 - 1000"}
                name={"weight"}
                value={input.weight}
                onChange={(e) => handleOnChange(e)}
              />{" "}
              kg{" "}
            </label>
            <p>{error.weight}</p>

            <br />

            <label>Height: </label>
            <label>
              <input
                type={"number"}
                placeholder={"1 - 40"}
                name={"height"}
                value={input.height}
                onChange={(e) => handleOnChange(e)}
              />{" "}
              m{" "}
            </label>
            <p>{error.height}</p>

            <br />
          </div>
          <div className="tipos">
            <label>Type: </label>

            <select onChange={(e) => handleTypes(e)}>
              
              {
              tipos?.map((ty) => {
                return (
                  <option name={ty.name} value={ty.name}>
                    {ty.name}
                  </option>
                );
              })}
            </select>
            <br />
            <br />
            {input.types?.map((e) => {
              return (
                <div className="typesSelect" key={e}>
                  <p className="pTypes">{e} ✅</p>
                  { 
                  <button
                  className="btnDelete"
                  onClick={() => {
                    handleDelete(e);
                  }}
                >
                  x
                </button> 
                }
                  
                </div>
              );
            })}

            <p>{input.types.length >= 3 ? error.types: ""}</p>
            <p>{input.types.length === 1 ?"Puedes agregar 1 mas si quieres!" : ""}</p>

            <br />
          </div>
          <br />
          <br />
          <div className="btnCrear">
            <button disabled={!disEna && "disabled"} type={"submit"}>
              Create now!
            </button>
            {!disEna ? <p>❌Revisa Tu Informacion❌</p> : <p></p>}
          </div>
        </form>
        <br />
      </div>
    </div>
  );
}