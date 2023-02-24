const { Pokemon, Type } = require("../db");
const { Sequelize } = require("sequelize");
const axios = require("axios");
const urlApiPokemon = `https://pokeapi.co/api/v2/pokemon`;
const urlApiTypes = `https://pokeapi.co/api/v2/type`;

const getApiInfo = async () => {
  const apiUrl = await axios.get(urlApiPokemon);

  // console.log(apiUrl.data.next) //obtengo el array results: [{name + url de los primeros 40}]
  const apiUrl20 = await axios.get(apiUrl.data.next);
  const apiSuma = await apiUrl.data.results.concat(apiUrl20.data.results);
  const pokeUrl = []; // uso este array para poner la url de cada pokemon despues de realizar el foreach
  apiSuma.forEach((el) => {
    pokeUrl.push(axios.get(el.url).then((resp) => resp.data)); //pusheo el contenido de la url de c/pokemon(obj {name, id, img, etc})
  });

  const apiInfo = Promise.all(pokeUrl) //Promise.all espera que todas las promesas se cumplan y si se da...
    .then((res) =>
      res.map((p) => {
        //toma la respuesta y mapea por cada pokemon la info necesaria
        return {
          id: p.id,
          name: p.name,
          img: p.sprites.other.dream_world.front_default,
          type: p.types.map((el) => el.type.name),
          health: p.stats[0].base_stat,
          attack: p.stats[1].base_stat,
          defense: p.stats[2].base_stat,
          speed: p.stats[5].base_stat,
          height: p.height,
          weight: p.weight,
        }; //devuelve toda la info
      })
    );
  return await apiInfo; //espera a que apiInfo reciba toda la info y cuando termina getApiInfo() devuelve esa const si la ejecutamos
};
const getIdApi = async (id) => {
  try {
    const apiUrl = await axios.get(urlApiPokemon + `/` + id);
    return {
      id: apiUrl.data.id,
      name: apiUrl.data.name,
      type: apiUrl.data.types.map((el) => el.type.name),
      img: apiUrl.data.sprites.other.dream_world.front_default,
      hp: apiUrl.data.stats[0].base_stat,
      attack: apiUrl.data.stats[1].base_stat,
      defense: apiUrl.data.stats[2].base_stat,
      speed: apiUrl.data.stats[3].base_stat,
      height: apiUrl.data.height,
      weight: apiUrl.data.weight,
    };
  } catch (error) {
    return { error: "Pokemon not found" };
  }
};
const getNameApi = async (name) => {
  try {
    const apiUrl = await axios.get(urlApiPokemon + `/` + name);
    // console.log(apiUrl)
    return {
      id: apiUrl.data.id,
      name: apiUrl.data.name,
      img: apiUrl.data.sprites.other.dream_world.front_default,
      type: apiUrl.data.types.map((el) => el.type.name),
      hp: apiUrl.data.stats[0].base_stat,
      attack: apiUrl.data.stats[1].base_stat,
      defense: apiUrl.data.stats[2].base_stat,
      speed: apiUrl.data.stats[3].base_stat,
      height: apiUrl.data.height,
      weight: apiUrl.data.weight,
    };
  } catch (error) {
    return { error: "Pokemon not found" };
  }
};
const getTypesApi = async () => {
  const response = await axios.get(urlApiTypes);
  const types = response.data.results;
  const typeNames = [];
  for (let type of types) {
    let existingType = await Type.findOne({ where: { name: type.name } }); // lo que hago aca es buscar si ya tengo un type con tal nombre lo guardo en vez de crear otro para evitar pisar el id
    if (existingType) {
      typeNames.push(existingType);
    } else {
      const newType = await Type.create({
        name: type.name,
      });
      typeNames.push(newType);
    }
  }
  return typeNames;
};

const serchType = async (types) => {
  const typ = await Type.findAll({
    where: { name: types },
  });
  if (!typ.length) {
    typ = await getTypesApi();
  }
  return typ;
};
// ----------------------------------
const createPokemon = async (
  name,
  img,
  type,
  hp,
  attack,
  defense,
  speed,
  height,
  weight
) => {
  return await Pokemon.create({
    name,
    img: img
      ? img
      : "https://assets.pokemon.com/assets/cms2/img/pokedex/full/132.png",
    type: type.length ? type : ["normal"],
    hp,
    attack,
    defense,
    speed,
    height,
    weight,
  });
};

const getDbPokemon = async () => {
  const pokemons = await Pokemon.findAll();
  return pokemons;
};
const getId = async (id) => {
  try {
    const pokemons = await Pokemon.findOne({
      where: {
        id: id,
      },
    });
    return pokemons;
  } catch (error) {
    return { error: "Pokemon not found" };
  }
};
const getName = async (name) => {
  try {
    const pokemon = await Pokemon.findOne({
      where: {
        name,
      },
    });
    if (!pokemon) {
      return { error: "Pokemon not found" };
    }
    return pokemon;
  } catch (error) {
    return { error: "Pokemon not found" };
  }
};
const getPokemons = async () => {
  const api = await getApiInfo(); // una funcion que espera que se resuelve tanto el obtener la informacio de la api como de la base de datos para devolverlos concatenados
  const db = await getDbPokemon();
  return api.concat(db);
};
const deletePokemon = async (id) => {
  try {
    const pokemon = await Pokemon.findByPk(id);
    if (!pokemon) {
      throw new Error("Pokemon not found");
    }
    await pokemon.destroy();
    return pokemon;
  } catch (error) {
    return { error: "Pokemon not found" };
  }
};
const updatePokemon = async (
  id,
  name,
  img,
  type,
  hp,
  attack,
  defense,
  speed,
  height,
  weight
) => {
  try {
    const pokemon = await Pokemon.findByPk(id);
    if (!pokemon) {
      throw new Error("Pokemon not found");
    }
    await pokemon.update({
      name,
      img,
      type,
      hp,
      attack,
      defense,
      speed,
      height,
      weight,
    });
    return pokemon;
  } catch (error) {
    return { error: "Pokemon not found" };
  }
};

module.exports = {
  serchType,
  getApiInfo,
  createPokemon,
  getDbPokemon,
  getId,
  getTypesApi,
  getPokemons,
  getName,
  getNameApi,
  getIdApi,
  deletePokemon,
  updatePokemon,
};
// const dc = {
//   count: 1279,
//   next: "https://pokeapi.co/api/v2/pokemon?offset=20&limit=20",
//   previous: null,
//   results: [
//     { name: "bulbasaur", url: "https://pokeapi.co/api/v2/pokemon/1/" },
//     { name: "ivysaur", url: "https://pokeapi.co/api/v2/pokemon/2/" },
//     { name: "venusaur", url: "https://pokeapi.co/api/v2/pokemon/3/" },
//     { name: "charmander", url: "https://pokeapi.co/api/v2/pokemon/4/" },
//     { name: "charmeleon", url: "https://pokeapi.co/api/v2/pokemon/5/" },
//     { name: "charizard", url: "https://pokeapi.co/api/v2/pokemon/6/" },
//     { name: "squirtle", url: "https://pokeapi.co/api/v2/pokemon/7/" },
//     { name: "wartortle", url: "https://pokeapi.co/api/v2/pokemon/8/" },
//     { name: "blastoise", url: "https://pokeapi.co/api/v2/pokemon/9/" },
//     { name: "caterpie", url: "https://pokeapi.co/api/v2/pokemon/10/" },
//     { name: "metapod", url: "https://pokeapi.co/api/v2/pokemon/11/" },
//     { name: "butterfree", url: "https://pokeapi.co/api/v2/pokemon/12/" },
//     { name: "weedle", url: "https://pokeapi.co/api/v2/pokemon/13/" },
//     { name: "kakuna", url: "https://pokeapi.co/api/v2/pokemon/14/" },
//     { name: "beedrill", url: "https://pokeapi.co/api/v2/pokemon/15/" },
//     { name: "pidgey", url: "https://pokeapi.co/api/v2/pokemon/16/" },
//     { name: "pidgeotto", url: "https://pokeapi.co/api/v2/pokemon/17/" },
//     { name: "pidgeot", url: "https://pokeapi.co/api/v2/pokemon/18/" },
//     { name: "rattata", url: "https://pokeapi.co/api/v2/pokemon/19/" },
//     { name: "raticate", url: "https://pokeapi.co/api/v2/pokemon/20/" },
//   ],
// };
