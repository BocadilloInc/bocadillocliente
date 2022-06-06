import React from 'react';
import { Route, Routes } from 'react-router';
import firebase , { FirebaseContext } from './firebase';
import Ordenes from './components/paginas/Ordenes';
import Menu from './components/paginas/Menu';
import NuevoPlatillo from './components/paginas/NuevoPlatillo';
import Login from './components/Login/Login';
import Registro from './components/Login/Registro';
function App() {

  const [usuario, setUsuario] = React.useState(null);


  return (
    <FirebaseContext.Provider
      value={{
        firebase
      }}
    >
          <Routes>
            
            <Route path="/" element={<Login /> } />
            <Route path="/Registro" element={<Registro /> } />
            <Route path="/menu" element={<Menu /> } />
            <Route path="/nuevo-platillo" element={<NuevoPlatillo /> } />
            <Route path="/ordenes" element={<Ordenes /> } />
          </Routes>
    </FirebaseContext.Provider>
  );
}
export default App;
