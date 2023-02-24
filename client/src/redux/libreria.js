const ValidaUUID4V = ({ id }) => {
  if (
    /^[0-9A-F]{8}-[0-9A-F]{4}-[4][0-9A-F]{3}-[89AB][0-9A-F]{3}-[0-9A-F]{12}$/i.test(
      id
    )
  ) {
    return true;
  } else {
    return false;
  }
};
export const miFiltro = (allFilter, pokemons) => {
  const { created,seteo,az } = allFilter;
//   console.log(allFilter, pokemons)
  let nuevoPokemons = [];
  if (created === "dbPoke") {
    nuevoPokemons = pokemons.filter((x) => {
      return ValidaUUID4V(x);
    });
  } else if (created === "apiPoke") {
    nuevoPokemons = pokemons.filter((x) => {
      return !ValidaUUID4V(x);
    });
  } else {
    nuevoPokemons = pokemons.slice();
  }if(seteo!=="All"){
    nuevoPokemons= nuevoPokemons.filter((cur) => cur.type.includes(seteo)) 
  }
  if(az==="descA"){

    nuevoPokemons= nuevoPokemons.sort((a,b)=> {
        if (a.attack < b.attack) {
          return 1
        }else if (a.attack > b.attack) {
          return -1
        }
        else {
          return 0
        }
      })
  }else if(az==="ascA"){
    nuevoPokemons= nuevoPokemons.sort((a,b)=> {
        if (a.attack > b.attack) {
          return 1
        } else if (a.attack < b.attack) {return -1}
        else {return 0}
      })
  }else if(az==="asc"){
    nuevoPokemons= nuevoPokemons.sort((a, b) => {
        if (a.name.toLowerCase() > b.name.toLowerCase()) {
          return 1;
        } else if (a.name.toLowerCase() < b.name.toLowerCase()) {
          return -1;
        } else {
          return 0;
        }
      })
  } else if(az==="desc"){
   nuevoPokemons= nuevoPokemons.sort((a, b) => {
        if (a.name.toLowerCase() < b.name.toLowerCase()) {
          return 1;
        } else if (a.name.toLowerCase() > b.name.toLowerCase()) {
          return -1;
        } else {
          return 0;
        }
      })
  }
  return nuevoPokemons;
};
