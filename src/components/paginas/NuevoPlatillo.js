import React, { useContext , useState} from "react";
import { useFormik } from "formik";
import * as Yup from 'yup';
import { FirebaseContext } from '../../firebase';
import FileUploader from 'react-firebase-file-uploader';
import SideBar from "../ui/Sidebar";


import { useNavigate } from "react-router";

const NuevoPlatillo = () => {
    //state de imganes
    const [subida, guardarSubiendo]=useState(false);
    const [progreso, guardarProgreso]=useState(0);
    const [urlimgaen, guardarUrlimagen]=useState("");
    //context con firebase
    const { firebase } = useContext(FirebaseContext);
    //Hook para redireccionar
    //console.log(firebase)
    const navigate = useNavigate();

    //validacion del formulario
    const formik = useFormik({
        initialValues:{
            nombre: '',
            precio: '',
            categoria: '',
            imagen:'',
            descripcion: '',
        },
        validationSchema: Yup.object({
            nombre: Yup.string()
                        .min(3,'Los platillos minimo deben tener 3 caracteres')
                        .required('EL nombre de los platillos es obligatorio'),
            precio: Yup.number()
                        .required('El precio es obligatorio'),
            categoria: Yup.string()
                        .required('La categoria es obligatoria'), 
            descripcion: Yup.string()
                        .required('Se debe incliuir una pequeña descripcion del producto'),
        }),
        onSubmit: platillo =>{
            try{
                platillo.existencia = true;
                platillo.imagen = urlimgaen;
                firebase.db.collection('productos').add(platillo);
                navigate('/menu');
            }catch(error){
                console.log(error);
            }
        }
    })
    //Imagenes
    const handleUploadStart =()=>{
        guardarProgreso(0);
        guardarSubiendo(true);

    }
    const handleUploadError = error =>{
        guardarSubiendo(false);
        console.log(error);
    }
    const handleUploadSucces= async nombre =>{
        guardarProgreso(100);
        guardarSubiendo(false);

        //almacenamiento de la URL
        const url = await firebase.storage.ref("productos").child(nombre).getDownloadURL();
        console.log(url);
        guardarUrlimagen(url);
    }
    const handleProgress= progreso =>{
        guardarProgreso(progreso);
        console.log(progreso)
    }

    return ( 
    <div className='md:flex min-h-screen '>
            <SideBar />
        <h1 className="text-3xl font-light mb-4">Agregar Platillo</h1>
        <div className="flex justify-center mt-10">
            <div className="w-full max-w-3xl" >
                <form
                        onSubmit={formik.handleSubmit}   
                >
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="nombre">Nombre</label>
                        <input 
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:shadow-outline"
                            id="nombre"
                            type="text"
                            placeholder="Nombre Del Platillo"
                            value={formik.values.nombre}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                        />
                    </div>
                    { formik.touched.nombre && formik.errors.nombre ?(
                        <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-5" role="alert">
                            <p className="font-bold">Hubo un error:</p>
                            <p>{formik.errors.nombre}</p> 
                        </div>
                    ): null }

                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="precio">Preio</label>
                        <input 
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:shadow-outline"
                            id="precio"
                            type="number"
                            placeholder="Precio"
                            min="0"
                            value={formik.values.precio}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                        />
                    </div>
                    { formik.touched.precio && formik.errors.precio ?(
                        <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-5" role="alert">
                            <p className="font-bold">Hubo un error:</p>
                            <p>{formik.errors.precio}</p> 
                        </div>
                    ): null }


                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="nombre">Categoria</label>
                        <select  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:shadow-outline"
                            id="categoria"
                            name="categoria"
                            value={formik.values.categoria}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            >
                            <option value="">-- Seleccionle --</option>
                            <option value="desayuno">Desayuno</option>
                            <option value="comida">Comida</option>
                            <option value="cena">Cena</option>
                            <option value="bebidas">Bebidas</option>
                            <option value="poasres">Postre</option>
                        </select>
                    </div>
                    { formik.touched.categoria && formik.errors.categoria ?(
                        <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-5" role="alert">
                            <p className="font-bold">Hubo un error:</p>
                            <p>{formik.errors.categoria}</p> 
                        </div>
                    ): null }

                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="imagen">Imagen</label>
                        <FileUploader
                            accept="imagen/*"
                            id="imagen"
                            name="imagen"
                            randomizeFilename
                            storageRef={firebase.storage.ref("productos")}
                            onUploadStart={handleUploadStart}
                            onUploadError={handleUploadError}
                            onUploadSuccess={handleUploadSucces}
                            onProgress={handleProgress}
                        />
                    </div>
                    {subida &&(
                        <div className="h-12 relative w-full border-emerald-400">
                            <div className="bg-green-500 text-white p-3 text-center my-5 items-center"  style={{width: '${progreso}%'}}>
                                {progreso} %
                            </div>
                        </div>
                    )
                    }
                    {urlimgaen &&
                    <p className="bg-green-500 text-white p-3 text-center my-5">
                        La imagen se subio correctamente
                    </p>

                    }

                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="descripcion">Descripcion</label>
                        <textarea 
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:shadow-outline h-20"
                            id="descripcion"
                            type="text"
                            placeholder="Descripcion del platillo"
                            value={formik.values.descripcion}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                        />
                    </div>
                    { formik.touched.descripcion && formik.errors.descripcion ?(
                        <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-5" role="alert">
                            <p className="font-bold">Hubo un error:</p>
                            <p>{formik.errors.descripcion}</p> 
                        </div>
                    ): null }
                    <input
                        type="submit"
                        className="bg-gray-800 hover:bg-gray-900 w-full mt-5 p-2 text-white uppercase font-bold"
                        value="Agregar platillo"
                    />
                    
                </form> 
            </div>
        </div>
    </div>
     );
}
 
export default NuevoPlatillo;