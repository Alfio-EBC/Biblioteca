// src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import RegistrarLib from './componentes/RegistrarLib';
import PrincipalMenu from './componentes/MenuPrin';
import BorrarLibro from './componentes/BorrarLibro';
import ActualizarLibro from './componentes/ActualizarLibro';
import BuscarLibro from './componentes/BuscarLibro';
import Listadolibros from './componentes/Listadolibros';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../src/Estilos.css';

const App = () => {
  return (
    <Router>
      <PrincipalMenu />
      <Routes>
        <Route path="/" element={<RegistrarLib />} />
        <Route path="/listadodelibros" element={<Listadolibros />} />
        <Route path="/registrarlibros" element={<RegistrarLib />} />
        <Route path="/eliminarlibro" element={<BorrarLibro />} />
        <Route path="/actualizarlibro" element={<ActualizarLibro />} />
        <Route path="/buscarlibro" element={<BuscarLibro />} />
      </Routes>
   
    </Router>
  );
};

export default App;
