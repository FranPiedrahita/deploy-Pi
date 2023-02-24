import React from "react";
import "./Paginado.css";
import { useDispatch, useSelector } from "react-redux";
import { seteandoPagina } from "../../redux/actions";
const Paginado = ({ allPokemones }) => {
  const pageNumber = [];
const dispatch = useDispatch()
const paginaActual = useSelector((state) => state.inicialpage);
  for (let i = 0; i <= Math.ceil(allPokemones / 12); i++) {
    pageNumber.push(i + 1);
  }

  const handlePrev = () => {
    if (paginaActual !== 1) dispatch(seteandoPagina(paginaActual - 1));
  };

  const handleNext = () => {
    if (paginaActual!== 1000) dispatch(seteandoPagina(paginaActual + 1));
  };
  const handlerSelect = (currentPage) => {
     dispatch(seteandoPagina(currentPage));
  };

  pageNumber.pop();

  return (
    <div className="pag_div_externo">
      <div className="paginado">
        {paginaActual !== 1 ? (
          <button
            className="prevBtn"
            key="prev"
            onClick={() => handlePrev()}
          >
            Prev
          </button>
        ) : (
          ""
        )}

        {pageNumber &&
          pageNumber.map((number) => {
            return (
              <div className="numbered-buttons" key={number}>
                <button
                  className={`${"number-button"} ${
                    paginaActual === number ? "number-button-focus" : ""
                  }`}
                  onClick={() => handlerSelect(number)}
                >
                  {number}
                </button>
              </div>
            );
          })}
        {paginaActual !== Math.ceil(allPokemones / 12) ? (
          <button
            className="nextBtn"
            key="next"
            onClick={() => handleNext()}
          >
            Next
          </button>
        ) : (
          ""
        )}
      </div>
    </div>
  );
};

export default Paginado;