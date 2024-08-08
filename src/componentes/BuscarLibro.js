import React, { useState } from 'react';
import { Button, ButtonGroup, Card } from "react-bootstrap";
import iAx from "../ConfigAXIOS";
import '../Estilos.css';

const BuscarLibro = () => {
    const [formData, setFormData] = useState({
        isbn: '',
        autor: '',
        tema: ''
    });

    const [searchResult, setSearchResult] = useState(null);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSearch = () => {
        getLibro();
    };

    async function getLibro() {
        try {
            const data = {
                isbn: formData.isbn,
                autor: formData.autor,
                tema: formData.tema
            };

            const rta = await iAx.post('/getLibro', JSON.stringify(data));
            console.log("Registro: " + JSON.stringify(data));
            console.log("Cant. registros:", Array.isArray(rta.data.info) ? rta.data.info.length : 'No es un array');
            console.log("status ----> " + rta.status);

            if (rta.data.msg === "ER") {
                alert(rta.data.info);
                setSearchResult(null);
            } else if (rta.data.info.length > 0) {
                const book = rta.data.info[0];
                setSearchResult({
                    titulo: book.titulo,
                    autor: book.autor,
                    tema: book.tema,
                    isbn: book.isbn,
                    medio: book.medio,
                    ubicacion: book.ubicacion,
                    fechaedicion: new Date(book.fechaedicion).toLocaleDateString(),
                    numeropaginas: book.numeropaginas,
                    cantidadejemplares: book.cantidadejemplares,
                    disponibles: book.disponibles,
                    resumen: book.resumen
                });
            } else {
                alert("No se encontraron resultados.");
                setSearchResult(null);
            }
        } catch (error) {
            console.log("ERROR: " + error.message);
        }
    }

    return (
        <div className="menu-container container">
            <header>
                <div className="titleothers">
                    <h1 className="text-light text-center">Buscar libro</h1>
                </div>
                <div className="subcontainerSecondPage">
                    <Card>
                        <Card.Body>
                            <div className="form">
                                <div className="row">
                                    <div>
                                        <label htmlFor="isbn" className="rojo">ISBN: </label>
                                        <input
                                            type="text"
                                            name="isbn"
                                            value={formData.isbn}
                                            onChange={handleChange}
                                        />
                                    </div>
                                    <div>
                                        <label htmlFor="autor" className="rojo">Autor: </label>
                                        <input
                                            type="text"
                                            name="autor"
                                            value={formData.autor}
                                            onChange={handleChange}
                                        />
                                    </div>
                                    <div>
                                        <label htmlFor="tema" className="rojo">Tema: </label>
                                        <input
                                            type="text"
                                            name="tema"
                                            value={formData.tema}
                                            onChange={handleChange}
                                        />
                                    </div>
                                </div>
                            </div>
                            <ButtonGroup>
                                <Button className="custom-violent-buttonb mt-4" variant="secondary" onClick={handleSearch}>
                                    Buscar libro
                                </Button>
                            </ButtonGroup>
                            {searchResult && (
                                <div className="resultado">
                                    <h2>Resultado de la búsqueda</h2>
                                    <p><strong>Título:</strong> {searchResult.titulo}</p>
                                    <p><strong>Autor:</strong> {searchResult.autor}</p>
                                    <p><strong>Tema:</strong> {searchResult.tema}</p>
                                    <p><strong>ISBN:</strong> {searchResult.isbn}</p>
                                    <p><strong>Tipo de medio:</strong> {searchResult.medio}</p>
                                    <p><strong>Ubicación física:</strong> {searchResult.ubicacion}</p>
                                    <p><strong>Fecha de edición:</strong> {searchResult.fechaedicion}</p>
                                    <p><strong>Número de páginas:</strong> {searchResult.numeropaginas}</p>
                                    <p><strong>Cantidad de ejemplares:</strong> {searchResult.cantidadejemplares}</p>
                                    <p><strong>Cantidad de ejemplares disponibles:</strong> {searchResult.disponibles}</p>
                                    <p><strong>Resumen:</strong> {searchResult.resumen}</p>
                                </div>
                            )}
                        </Card.Body>
                    </Card>
                </div>
            </header>
        </div>
    );
};

export default BuscarLibro;
