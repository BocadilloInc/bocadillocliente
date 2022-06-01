import React, {useState, useContext} from "react";
import { FirebaseContext } from "../../firebase";
import Platillo from "./Platillo";
/**/
const Orden = ({orden}) => {


    const [tiempoentrega, guardarTiempoEntrega ] = useState(0);
    const {firebase} = useContext(FirebaseContext);


    const definirTiempo = id =>{
        try {
            firebase.db.collection('ordenes')
            .doc(id)
            .update({
                tiempoentrega
            })    
        } catch (error) {
            console.log(error);
        }
    }
    //CompletarOrden 
    const completarOrden = id =>{
        try {
            firebase.db.collection('ordenes')
                        .doc(id)
                        .update({
                            completado:true
                        })
        } catch (error) {
            console.log(error)
        }
    }
    return (  
        <div className="sm:w-1/3 lg:w-1/4 px-2 mb-3">
            <div className="p-3 shadow-md bg-white">
                <h1 className="text-yellow-600 text-lg font-bold">{ orden.id }</h1>   
                {orden.orden.map( Platillo =>(
                    <p className="text-gray-600"> {Platillo.cantidad} {Platillo.nombre}</p>
                ))}
                <p className="text-gray-700 font-bold">Total a pagar: $ {orden.total}</p>
                {orden.tiempoentrega === 0 && (

                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2">
                            Tiempo de entrega:
                        </label>
                        <input 
                            type="time"
                            value={tiempoentrega}
                            onChange={ e => guardarTiempoEntrega (e.target.value)}
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-utline"></input>

                        <button
                            onClick={ ()=> definirTiempo(orden.id)}
                            type="sumit"
                            className="bg-gray-800 hover:bg-gray-900 w-full mt-5 p-2 text-white uppercase font-bold"
                        >
                            Definir tiempo
                        </button>
                    </div>
                    )
                }
                {orden.tiempoentrega && (
                   <p className="text-gray-700">Hora estimada de entrega:
                       <span className="font-bold">{orden.tiempoentrega} Horas</span> 
                   </p> 
                )}

                { !orden.completado && !orden.tiempoentrega == "" && (
                    <button 
                        type="button"
                        className="bg-blue-800 hover:bg-blue-700 w-full mt-5 p-2 text-white uppercase font-bold"
                        onClick={ ()=> completarOrden (orden.id)}>
                        Marcar como Lista
                    </button>
                )

                }
            </div>
        </div>
    );
}
 
export default Orden;