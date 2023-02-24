import React from 'react'
import{ getPokemones,
    filterPokemonesbyType,
    orderA_Z,
    getTypes,
    seteandoCreados,
    filReset,
    seteandoPagina,} from "../../redux/actions";
    import { useDispatch,useSelector} from "react-redux";
    import { useEffect, } from "react";
    import"./Filtro.css" ;
export default function Filtros() {
    const dispatch = useDispatch();
    const allTypes = useSelector((state) => state.types); // extraigo los datos del store utilizando una funcion selectora (useSelector)
    const allFilter = useSelector((state) => state.optionFilter);
  
    useEffect(() => {
      dispatch(getTypes());
    }, [dispatch]);
  
    function handleOrderAZ(e) {
      dispatch(orderA_Z(e.target.value));
      dispatch(seteandoPagina(1))
    }
    function handleCreApi(e) {
      dispatch(seteandoCreados(e.target.value));
      dispatch(seteandoPagina(1))
    }
    
    function resetFilter(){
      dispatch(filReset({az:"All",created:"allPoke",reseteo:"All",seteo:"All"}));
      dispatch(getPokemones());
    
    }
    
    
    function handleTypesFilt(e) {
         e.preventDefault();
         dispatch(filterPokemonesbyType(e.target.value));
         dispatch(seteandoPagina(1))
       }
      
      
    
      
    
  return (
    <div>
         <h3 className="textFilter">Filter By:</h3>
       


        <select className="btnCreados" value={allFilter.created} onChange={(e) => handleCreApi(e)}>

          <option value={"allPoke"}>ALL</option>
          <option value={"apiPoke"}>API</option>
          <option value={"dbPoke"}>Created</option>
        </select>

         <select className="btnTipos" value={allFilter.seteo} onChange={(e) => handleTypesFilt(e)}>
          
          <option value={"All"}>Types</option>
          {allTypes?.map((curr) => {
            return <option value={curr.name}>{curr.name}</option>;
          })}
        </select> 

        <select className="btnTipos"value={allFilter.az} onChange={(e) => handleOrderAZ(e)}>
          <option value="All">ORDENAMIENTO</option>
          <option value="descA">ATTACK + TO -</option>
          <option value="ascA">ATTACK - TO +</option>
          <option value={"asc"}>A-Z</option>
          <option value={"desc"}>Z-A</option>
      
        </select>
        <button  className ="BotonRESET" type="button" onClick={resetFilter}>Reset</button>
        
    </div>
  
)
  }