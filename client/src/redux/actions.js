import axios from "axios";

export const GET_POKEMONES = 'GET_POKEMONES' 
export const GET_NAME = 'GET_NAME'
export const GET_TYPES = 'GET_TYPES'
export const CREATE_POKEMON = 'CREATE_POKEMON'
export const GET_DETAILS = 'GET_DETAILS'
export const FILTER_TYPE = 'FILTER_TYPE'
export const ORDER_A_Z = 'ORDER_A_Z'
export const FILTER_API_DB = "FILTER_API_DB"
export const FILTER_ATTACK = "FILTER_ATTACK";
export const DELETE = "DELETE"
export const RESETEO ="RESETEO"
export const SET_CREADOS = "SET_CREADOS"
export const INICIO_PAGE="INICIO_PAGE"


export const getPokemones = (alterminar) => {
  return async (dispatch) => {
    let pedidoApi = await axios.get("/pokemons/");
    alterminar()
   return dispatch({ 
      type: "GET_POKEMONES",
     payload: pedidoApi.data });
  };
};



export function getDetail(id) {
    return async function (dispatch) {
      
        let url = await axios.get(`/pokemons/${id}` );
        return dispatch({
          type: "GET_DETAILS",
          payload: url.data,
        });
    };
  }

  export function getNamePoke(name,alterminar){
    return async function (dispatch) {
      let url = await axios.get(
        `/pokemons?name=${name}`
        );
        try {
       alterminar()
      return dispatch({
        type: "GET_NAME",
        payload: [url.data]
      })
     } catch (error) {
      alert("No se encontro")
      return dispatch({
        type: "GET_NAME",
        payload: [url.data]
      })}
       
    }
  }

  export const createPoke = (pokemon) => {
    return async (dispatch) => {
      const pok={
        attack:pokemon.attack,
        defense: pokemon.defense,
       height:pokemon.height,
        hp:pokemon.hp, 
       img:pokemon.img,
        name:pokemon.name,
        speed:pokemon.speed,
        type : pokemon.types,
        weight: pokemon.weight,
        }
      var response = await axios.post("/pokemons", pok)
      return dispatch({
        
        type: "CREATE_POKEMON",
       response
  
      })
    };
  };

  export function getTypes() {
      return async function (dispatch) {
        let type = await axios.get("/types");
        return dispatch({ 
          type: "GET_TYPES", 
          payload: type.data });
      };
    }

export const filterPokemonesbyType = (payload)=>{
    return {
        type: "FILTER_TYPE",
        payload
    }
}

export const orderA_Z = (payload) => {
 
  return {
    type: 'ORDER_A_Z',
    payload
  }
}

export function creApiFilt(payload){
  return {
      type: 'FILTER_API_DB',
      payload
  }
}



export function filterAttack(payload) {
  return{
    type: "FILTER_ATTACK",
    payload
  }
}

export function filReset(payload) {
  return{
    type: "RESETEO",
    payload
  }

}
export function seteandoCreados(payload) {
  return{
    type: "SET_CREADOS",
    payload
  }

}
export function seteandoPagina(payload) {
  return{
    type: "INICIO_PAGE",
    payload
  }

}
// export function deletePoke(id) {
//   return async function (dispatch) {
//     let url = await axios.delete("http://localhost:3001/pokemons/" + id)
//     return {
//       type: "DELETE",
//       url
//     }
//   }
// }
