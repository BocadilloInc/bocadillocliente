import React, { useContext , useState} from "react";
import { useNavigate } from "react-router";
import { FirebaseContext } from '../../firebase';
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { NavLink } from "react-router-dom";
const Login = () =>{
    const { firebase } = useContext(FirebaseContext);
    const auth = getAuth();
    const navigate = useNavigate();
    const [email, setCorreo] = useState('')
    const [password,setPass] = useState('')
    

    return(
    <div className='md:flex min-h-screen'>
    
        <div className="flex flex-wrap md:flex-1">
            <div className="sm:w-1/3 lg:w-1/4 px-2 mb-3">
                <div className="p-3 shadow-md bg-white">
                
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="nombre">Correo</label>
                        <input 
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:shadow-outline"
                            type="string"
                            placeholder="Correo"
                            onChange={e => setCorreo(e.target.value)}
                        />
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="nombre">Contraseña</label>
                        <input 
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:shadow-outline"
                            type="text"
                            placeholder="Contraseña"
                            onChange={e => setPass(e.target.value)}
                        />
                        <button 
                        onClick={()=>{
                            signInWithEmailAndPassword(auth, email, password)
                                                .then(() => {
                                                navigate('/menu');
                                                })
                                                .catch((error) => {
                                                    const errorCode = error.code;
                                                    const errorMessage = error.message;
                                                    console.log(error);
                                                });
                        }}
                        className="mt-10 ml-3 bg-gray-700 hover:bg-blue-700 , inline-block mb-5 p-2 , text-white hite-400 uppercase font-bold">
                            Iniciar session
                        </button>
                    </div>
                    <nav className="mt-5"> 
                        <NavLink className="p-1 text-gray-400 block hover:bg-yellow-500 hover:text-gray-900" exact="true" to="/Registro">Registro</NavLink>
                    </nav>
                </div>
            </div>
        </div>
    </div>
    )
}
export default Login;