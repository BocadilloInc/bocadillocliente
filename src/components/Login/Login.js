import React, { useContext , useState} from "react";
import { useNavigate } from "react-router";
import { FirebaseContext } from '../../firebase';
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
const Login = () =>{
    const { firebase } = useContext(FirebaseContext);
    const auth = getAuth();
    const navigate = useNavigate();
    const [email, setCorreo] = useState('')
    const [password,setPass] = useState('')
    function iniciarSession() {
        
    }

    return(
    <div className='md:flex min-h-screen'>
    <h1 className="text-3xl font-light mb-4"> Bocadillo </h1>
        <div className="flex flex-wrap md:flex-1">
            <div className="sm:w-1/3 lg:w-1/4 px-2 mb-3">
                <div className="p-3 shadow-md bg-white">
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="nombre">Correo</label>
                        <input 
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:shadow-outline"
                            id="correo"
                            type="string"
                            placeholder="Correo"
                            onChange={setCorreo}
                        />
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="nombre">Contraseña</label>
                        <input 
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:shadow-outline"
                            id="contrasena"
                            type="text"
                            placeholder="Contraseña"
                            onChange={setPass}
                        />
                        <button 
                        onClick={()=>{
                            signInWithEmailAndPassword(auth, email, password)
                                                .then(() => {
                                                    // Signed in
                                                // const user = userCredential.user;
                                                //  navigate('/nuevo-platillo');
                                                console.log("inicio de session")
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

                </div>
            </div>
        </div>
    </div>
    )
}
export default Login;