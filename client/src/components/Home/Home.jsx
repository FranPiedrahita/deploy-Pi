import React from "react";
import Cards from "../Cards/Cards";

// import {
//   getPokemones,
//    filterPokemonesbyType,
//   orderA_Z,
//   getTypes,
//   creApiFilt,
//   filterAttack,
//   filReset,
  
// } from "../../redux/actions";
import { Link } from "react-router-dom";
// import { useDispatch,useSelector} from "react-redux";
// import { useEffect, } from "react";
import "./Home.css";
import Error from "../Error/Error"



export default function Home() {
  // const dispatch = useDispatch();
  
  // useEffect(() => {
  //   dispatch(getTypes());
  // }, [dispatch]);

  //  const allTypes = useSelector((state) => state.types); // extraigo los datos del store utilizando una funcion selectora (useSelector)
  //  const allFilter = useSelector((state) => state.optionFilter);
  // useEffect(() => {
  //   dispatch(getPokemones());
  // }, [dispatch]);
  
  // function handleOrderAZ(e) {
  //   dispatch(orderA_Z(e.target.value));
  // }
  // function handleCreApi(e) {
  //   dispatch(creApiFilt(e.target.value));
  // }
  

    
    return (
      <div>
      <div id={"home"}>
      <br />
      <Link to="/create">
        <div className="btnCrearhome">
          <h5>Create Pokemon</h5>
        </div>

      </Link>     
        
        

        {<Cards /> ? <Cards /> : <Error/>}
      </div>
    </div>
    
  );
}

