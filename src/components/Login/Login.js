import React, {useState} from "react";
import { useNavigate } from "react-router";
import logo from "./Logo.jpg";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { NavLink } from "react-router-dom";
const Login = () =>{
    const auth = getAuth();
    const navigate = useNavigate();
    const [email, setCorreo] = useState('')
    const [password,setPass] = useState('')
    

    return(

        <main className="flex items-center justify-center h-screen bg-gray-100">
            <div className="bg-white w-96 p-6 rounded shadown-sm">   
                <div className="flex items-center justify-center mb-4">
                    <img src={logo} alt="Logotipo" className="h-32"/>
                </div>  
                <label className="text-gray-700" htmlFor="nombre">Correo electronico</label>
                <input 
                    className="w-full py-2 bg-stone-200 text-gray-500 px-1 outline-none mb-4"
                    type="email"
                    placeholder="Correo electronico"
                    required
                    onChange={e => setCorreo(e.target.value)}
                />
                <label className="text-gray-700" htmlFor="nombre">Contraseña</label>
                <input 
                    className="w-full py-2 bg-stone-200 text-gray-500 px-1 outline-none mb-4"
                    type="password"
                    placeholder="Contraseña"
                    required
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
                    className="bg-red-500 w-full text-white py-2 rounded hover:bg-red-600 transition-colors mb-4">
                    Iniciar Sesión
                </button>
                <nav> 
                    <label>¿No tienes una cuenta?<NavLink className="text-red-500 hover:text-red-600" exact="true" to="/Registro"> Registrate</NavLink></label>
                </nav>
            </div>     
        </main>
    )
}
export default Login;