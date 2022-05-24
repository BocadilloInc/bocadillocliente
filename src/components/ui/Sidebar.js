import React from "react";
import { NavLink } from "react-router-dom";
const SideBar = () => {
    return ( 
        <div className="md:w-2/5  xl:w-1/5 bg-gray-800">
            <div className="p-6">
                <p className="uppercase text-white text-2xl tracking-wide text-center font-bold">Restaurant App</p>

                <p className="mt3 text-gray-600">Administra tu restaurante: </p>
                <nav className="mt-5"> 
                    <NavLink className="p-1 text-gray-400 block hover:bg-yellow-500 hover:text-gray-900" exact="true" to="/menu">Menu</NavLink>
                    <NavLink className="p-1 text-gray-400 block hover:bg-yellow-500 hover:text-gray-900" exact="true" to="/ordenes" >Pedidos</NavLink>
                </nav>
            </div>
        </div>
     );
}
 
export default SideBar;
    <>
    </>
