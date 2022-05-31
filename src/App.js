import React from 'react';
import { Route, Routes } from 'react-router';

import firebase , { FirebaseContext } from './firebase';

import Ordenes from './components/paginas/Ordenes';
import Menu from './components/paginas/Menu';
import NuevoPlatillo from './components/paginas/NuevoPlatillo';


function App() {
  return (
    <FirebaseContext.Provider
      value={{
        firebase
      }}
    >
          <Routes>
            <Route path="/" element={<Menu /> } />
            <Route path="/nuevo-platillo" element={<NuevoPlatillo /> } />
            <Route path="/ordenes" element={<Ordenes /> } />
          </Routes>
      
    </FirebaseContext.Provider>
  );
}

export default App;
