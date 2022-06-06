
import React, { useContext, useState } from "react";
import { useFormik } from "formik";
import * as Yup from 'yup';
import { FirebaseContext } from "../../firebase"
import FileUploader from 'react-firebase-file-uploader';
import SideBar from "../ui/Sidebar";
import './Registro.css';
import { useNavigate } from "react-router";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";




const Registro = () => {

  const auth = getAuth();
  const navigate = useNavigate();
  
  
  function crearUsuarios(){

    
  }

 
  //state de imganes
  //context con firebase
  const { firebase } = useContext(FirebaseContext);
  const formik = useFormik({
    initialValues: {
      nombre: '',
      logoR: '',
      direccionR: '',
      estadoR: '',
      ciudadR: '',
      codigoR: '',
      emailR: '',
      password: '',
    },
    onSubmit: restaurant => {
      try {
        //platillo.imagen = urlimgaen;
       // firebase.db.collection('RestaurantesUsuarios').add(restaurant);
      
        const mail = restaurant.emailR;
        const password = restaurant.password;
        
        createUserWithEmailAndPassword(auth, mail, password)
        .then((userCredential) => {
          // Signed in
          const user = userCredential.user;
          console.log("registrado");
          firebase.db.collection('RestaurantesUsuarios').add(restaurant);
          navigate('/menu');
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          // ..
        });

      } catch (error) {
        console.log(error);
      }
    }
  })
  return (
    <div className="main_container">
      <div className="">
        <div className="imagen">
          <div className="texto-titulo">Datos de registro {/**  */}
          </div>
        </div>
        <div className="form_container">
          <form onSubmit={formik.handleSubmit} className="formulario">
            <fieldset>
              <legend>Ingrese los datos correctos de su restaurante.</legend>
              <div>
                <div >
                  <div className="contenedor-campos">
                    <div className="campo">
                      <label className="campo__label">Nombre del Restaurante</label>
                      <input
                        id="nombre"
                        value={formik.values.nombre}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        placeholder="Nombre Restaurante" className="campo__field" required></input>
                    </div>
                    <div className="campo file-select" >
                      <label className="campo__label">Logotipo Restaurante</label>
                      <input placeholder="Nombre Restaurante" type="file" accept="image/png,image/jpeg" name="image" className="file-select" aria-label="Archivo"></input>
                    </div>
                    <div className="campo">
                      <label className="campo__label">Dirección</label>
                      <input
                        id="direccionR"
                        value={formik.values.direccionR}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        placeholder="Dirección" className="campo__field" required />
                    </div>
                    <div className="campo">
                      <label className="campo__label">Estado / Provincia</label>
                      <input
                        id="estadoR"
                        value={formik.values.estadoR}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        placeholder="Estado/Provincia" type="text"  list="items" className="campo__field" required />
                      <datalist id="items">
                        <option>Aguascalientes</option>
                        <option>Baja California</option>
                        <option>Bajacalifornia Sur</option>
                        <option>Campeche</option>
                        <option>Coahuila</option>
                        <option>Colima</option>
                        <option>Chiapas</option>
                        <option>Chihuahua</option>
                        <option>Durango</option>
                        <option>Distrito Federal</option>
                        <option>Guanajuato</option>
                        <option>Guerrero</option>
                        <option>Hidalgo</option>
                        <option>Jalisco</option>
                        <option>México</option>
                        <option>Mihcoacán</option>
                        <option>Morelos</option>
                        <option>Nayarit</option>
                        <option>Nuevo León</option>
                        <option>Oaxaca</option>
                        <option>Puebla</option>
                        <option>Querétaro</option>
                        <option>Quintana Roo</option>
                        <option>San Luis Potosí</option>
                        <option>Sinaloa</option>
                        <option>Sonora</option>
                        <option>Tabasco</option>
                        <option>Tamaulipas</option>
                        <option>Tlaxcala</option>
                        <option>Veracruz</option>
                        <option>Yucatán</option>
                        <option>Zacatecas</option>
                      </datalist>
                    </div>
                    <div className="campo">
                      <label className="campo__label">Ciudad</label>
                      <input
                        id="ciudadR"
                        value={formik.values.ciudadR}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        placeholder="Ciudad" className="campo__field"/>
                    </div>
                    <div className="campo">
                      <label className="campo__label">Código Postal</label>
                      <input
                        id="codigoR"
                        value={formik.values.codigoR}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        placeholder="Código Postal" type="number" className="campo__field"  />
                    </div>
                    <div className="campo">
                      <label className="campo__label">Correo Eléctronico</label>
                      <input
                        id="emailR"
                        value={formik.values.emailR}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        placeholder="e-mail" className="campo__field"  />
                    </div>
                    <div className="campo">
                      <label className="campo__label">Contraseña</label>
                      <input
                        id="password"
                        value={formik.values.password}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        placeholder="Contraseña" type="password" className="campo__field"  />
                    </div>
                    <div className="campo">
                      <label className="campo__label">Repetir Contraseña</label>
                      <input placeholder="Repetir Contraseña" type="password" id="r-password" className="campo__field" alt="strongPass" required />
                    </div>
                  </div>
                </div>
                <div className="alinear-derecha wrap flex">
                  <button type="submit" className="boton">Avanzar</button>
                </div>
                <div >
                  <button type="reset" className="boton-secundario">Salir</button>
                </div>
              </div>
            </fieldset>
          </form>
        </div>
        <footer className="footer">Todos los derechos reservados 2022</footer>
      </div>
    </div>
  );
}

export default Registro;