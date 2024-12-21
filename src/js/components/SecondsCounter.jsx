// importo para validar el tipo de props
import PropTypes from "prop-types";
import React from "react";
// componente funcional SecondsCounter
const SecondsCounter= ({segundos})=>{
    //doy forma a como tienen que aparecer los segundo
    const formatearSegundos = (segundos) =>{
        // creo un string que guarde los seis digitos que crea padStart
        const stri = segundos.toString().padStart(6, '0');
        // retorna los seis digitos separados
        return stri.split('');
    };
    // obtenemos los seis digitos llamando a la funcion formatearSegundos
    const digitos = formatearSegundos(segundos)
    
    // renderizo el componente
    return (
        <div className="contador">
            <div className="icono-reloj">
                <i className="fa fa-clock-o"></i>
            </div>
            {/* Iteramos sobre los digitos y renderizamos cada uno en un div*/}
            {digitos.map((digito, indice)=>(
                <div key={indice} className="digito">
                    {digito}{/*aqui mostramos el digito */}
                </div>
            ))}

        </div>
    );
};
// validamos que la prop es un numero
SecondsCounter.propTypes = {
    segundos: PropTypes.number
};
// exportamos el componente funcional SecondsCounter
export default SecondsCounter;