// importar las acciones

import {
    GET_POKEMONES,
    CREATE_POKEMON,
    GET_NAME,
    GET_DETAILS,
    FILTER_TYPE,
    GET_TYPES,
    FILTER_API_DB,
    ORDER_A_Z,
    FILTER_ATTACK,
    // DELETE
    RESETEO,
    SET_CREADOS,
    INICIO_PAGE
  } from "./actions";
  
  let initialState = {
    pokemones: [],
    allPokemons: [],
    detail: [],
    types: [],
    optionFilter:{az:"All", created:"allPoke", reseteo:"All",seteo:"All"},
    inicialpage: 1
  };
  
  export default function rootReducer(state = initialState, action) {
    switch (action.type) {
      case GET_POKEMONES:
        return {
          ...state,
          pokemones: action.payload,
          allPokemons: action.payload,
          
        };
      case GET_TYPES:
        return {
          ...state,
          types: action.payload,
        };
      case FILTER_TYPE:
       
        return {
          ...state,
          optionFilter:{...state.optionFilter,seteo:action.payload} 
        };
      case GET_DETAILS:
        return {
          ...state,
          detail: action.payload,
        };
      case GET_NAME:
        return {
          ...state,
          pokemones: action.payload,
        };
      case CREATE_POKEMON:
        return {
          ...state,
        
        };
        case FILTER_ATTACK :
        
          return {
            ...state,
           
            optionFilter:{...state.optionFilter,reseteo:action.payload} 
          }
  
      case ORDER_A_Z:
      
        return {
          ...state,
          optionFilter:{...state.optionFilter,az:action.payload}
        };

  case RESETEO:
    return{
      ...state,
      optionFilter:action.payload
    }
     
    case FILTER_API_DB:
        let aux = state.allPokemons;
        return {
          ...state,
          pokemones:
        action.payload === "allPoke"
        ? state.allPokemons
        : action.payload === "dbPoke"
        ? aux.filter((c) => isNaN(c.id))
        : aux.filter((c) => !isNaN(c.id)),
        optionFilter:{...state.optionFilter,created:action.payload} 
        };
    //     case DELETE : 
    //     return {
    //       ...state
    //     }
       case SET_CREADOS:
        return{
          ...state,
          optionFilter:{...state.optionFilter,created:action.payload}  
        } 
        case INICIO_PAGE:
          return{
            ...state,
            inicialpage:action.payload
          } 
      default:
         return state;
    }
  }
  
  // case FILTER_ATTACK_ALF:
  //     const pokemonsAll = state.allPokemons;
  //     let sortArr =
  //       payload === "asc"
  //         ? pokemonsAll.sort((a, b) => {
  //             if (a.attack > b.attack) {
  //               return -1;
  //             }
  //             if (a.attack < b.attack) {
  //               return 1;
  //             }
  //             if (a.name > b.name) {
  //               return 1;
  //             }
  //             if (a.name < b.name) {
  //               return -1;
  //             }
  //             return 0;
  //           })
  //         : pokemonsAll.sort((a, b) => {
  //             if (a.attack < b.attack) {
  //               return -1;
  //             }
  //             if (a.attack > b.attack) {
  //               return 1;
  //             }
  //             if (a.name < b.name) {
  //               return 1;
  //             }
  //             if (a.name > b.name) {
  //               return -1;
  //             }
  //             return 0;
  //           });
  //     return {
  //       ...state,
  //       pokemons: sortArr,
  //     };