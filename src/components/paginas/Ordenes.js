import React , { useEffect, useState, useContext } from "react";
import { FirebaseContext } from "../../firebase";
import SideBar from "../ui/Sidebar";
import Orden from "../ui/Orden";


const Ordenes = () => {

    //Contex con las operaciones de firebase
    const { firebase } = useContext(FirebaseContext);

    // state con las ordenes
    const [ ordenes, guardarOrdenes ] = useState([]);

    useEffect(() =>{
        const obtenerOrdenes = () =>{
            firebase.db.collection('ordenes').where('completado', "==", false).onSnapshot(manejarSnapshot);
        }
        obtenerOrdenes();
    },[]);

    function manejarSnapshot(snapshot){
        const ordenes = snapshot.docs.map(doc =>{
            return{
                id: doc.id,
                ...doc.data()
            }
        });
        guardarOrdenes(ordenes);
    }

    return ( 
        <>
            <div className='md:flex min-h-screen '>
                <SideBar />
                <h1 className="text-3xl font-light mb-4">Ordenes</h1>
                <div className="sm:flex sm:flex-wra´-mx-3">
                    
                    {ordenes.map(orden =>(
                            <Orden 
                                key={orden.id}
                                orden={orden}
                            />
                        )

                        )}
                </div>
            </div>
        </>

     );
}
 
export default Ordenes;