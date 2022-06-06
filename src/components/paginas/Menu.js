import React, {useState, useEffect, useContext} from "react";
import { Link } from "react-router-dom";
import {FirebaseContext} from "../../firebase";
import Platillo from "../ui/Platillo";
import SideBar from '../ui/Sidebar';

//Obtener los valores de la sesion
import { getAuth } from "firebase/auth";


const Menu = () => {

    const auth = getAuth();
    const user = auth.currentUser;
    const email = user.email;
    console.log(email);
    const [platillos, guardarlatillos] = useState([]);


    const {firebase} = useContext(FirebaseContext);
    useEffect(()=>{
        const obtenerPlatillos =  ()=>{
            const resultado =  firebase.db.collection('productos').onSnapshot(handleSnapshot)
           
        }
        obtenerPlatillos();
    }, []);
//La siguiente function se utiliza snapshot para poder obtener los datos en tiempo real.

function handleSnapshot(snapshot){
    const platillos = snapshot.docs.map(doc => {
        return{
            id: doc.id,
            ...doc.data()
        }
    });
    guardarlatillos(platillos);
}

    return ( 
        <>  
            <div className='md:flex min-h-screen '>
                <SideBar />
                <div className='md:w-3/5  xl:w-4/5 p-6'>
                <h1 className="text-3xl font-light mb-3 ">Menu</h1>
                <Link  exact="true" to="/nuevo-platillo" className="ml-3 bg-gray-700 hover:bg-blue-700 , inline-block mb-5 p-2 , text-white hite-400 uppercase font-bold" >
                    Agregar Platillo
                </Link>
                {platillos.map( platillo => (
                    <Platillo
                        key={platillo.id}
                        platillo={platillo}
                    />    )
                )}
               </div> 
            </div>
            
        </>

     );
}
 
export default Menu;