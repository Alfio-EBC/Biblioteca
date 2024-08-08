// src/componentes/PrincipalMenu.js
import React from 'react';
import { Navbar, Nav } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import logo from './img/logo-beatbook.png'; 

const PrincipalMenu = () => {
  return (
    <Navbar bg="Menu text-light" expand="lg">
      <Navbar.Brand className='px-3' as={Link} to="/">        <img src={logo} alt="Biblioteca Logo" height="30" />
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav  ">
        <Nav className="mr-auto text-light px-2">
          <Nav.Link as={Link} to="/listadodelibros">Lista de Libros</Nav.Link>
          <Nav.Link as={Link} to="/registrarlibros">Registrar Libro</Nav.Link>
          <Nav.Link as={Link} to="/buscarlibro">Buscar Libro</Nav.Link>
          <Nav.Link as={Link} to="/eliminarlibro">Eliminar Libro</Nav.Link>
          <Nav.Link as={Link} to="/actualizarlibro">Actualizar Libro</Nav.Link>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default PrincipalMenu;
