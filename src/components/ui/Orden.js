import React from "react";
import Platillo from "./Platillo";
/**/
const Orden = ({orden}) => {
    return (  
        <div className="sm:w-1/2 lg:w-1/2 px-2 mb-4">
            <div className="p-3 shadow-md bg-white">
                <h1 className="text-yellow-600 text-lg font-bold">{ orden.id }</h1>   
                {orden.orden.map( Platillo =>(
                    <p className="text-gray-600"> {Platillo.cantidad} {Platillo.nombre}</p>
                ))}
                <p className="text-gray-700 font-bold">Total a pagar: $ {orden.total}</p>
                {orden.tiempoentrega === 0 &&(
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2">
                            Tiempo de entrega:
                        </label>
                        <input 
                            type="number"
                            min="1"
                            max="30"
                            placeholder="Tiepo"
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-utline"></input>
                   
                        <button
                            type="sumit"
                            className="bg-gray-800 hover:bg-gray-900 w-full mt-5 p-2 text-white uppercase font-bold"
                        >
                            Definir tiempo
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
}
 
export default Orden;