import React from 'react';
import { Route, Routes } from 'react-router';
import firebase , { FirebaseContext } from './firebase';
import Ordenes from './components/paginas/Ordenes';
import Menu from './components/paginas/Menu';
import NuevoPlatillo from './components/paginas/NuevoPlatillo';
import Login from './components/Login/Login';

function App() {
  return (
    <FirebaseContext.Provider
      value={{
        firebase
      }}
    >
          <Routes>
            <Route path="/" element={<Login /> } />
            <Route path="/menu" element={<Menu /> } />
            <Route path="/nuevo-platillo" element={<NuevoPlatillo /> } />
            <Route path="/ordenes" element={<Ordenes /> } />
          </Routes>
      
    </FirebaseContext.Provider>
  );
}

export default App;
