import React, { useState } from 'react';
import { Button, ButtonGroup, Card } from 'react-bootstrap';
import iAx from '../ConfigAXIOS';

const UpdateBook = () => {
    const [formData, setFormData] = useState({
        isbn: '',
        titulo: '',
        autor: '',
        tema: '',
        medioEjemplar: '',
        ubicacionFisica: '',
        fechaEdicion: '',
        numeroPaginas: '',
        cantidadEjemplares: '',
        ejemplaresDisp: '',
        resumen: '',
    });

    const resetForm = () => {
        setFormData({
            isbn: '',
            titulo: '',
            autor: '',
            tema: '',
            medioEjemplar: '',
            ubicacionFisica: '',
            fechaEdicion: '',
            numeroPaginas: '',
            cantidadEjemplares: '',
            ejemplaresDisp: '',
            resumen: '',
        });
    };

    const obtenerInformacionActual = async () => {
        await getLibro();
    };

    const updateLibro = async () => {
        try {
            const response = await iAx.post('/updateLibro', formData);
            if (response.data.msg === 'ER') {
                alert(response.data.info);
                console.log('No se ha podido actualizar el registro');
            } else {
                alert(response.data.info);
            }
        } catch (error) {
            console.log('ERROR:', error.message);
            // Removed toast.error call
        }
    };

    async function getLibro() {
        try {
            const data = {
                isbn: formData.isbn,
                autor: formData.autor,
                tema: formData.tema,
                medioEjemplar: formData.medioEjemplar,
            };

            const rta = await iAx.post('/getLibro', data);
            console.log("Registro:", JSON.stringify(data));
            console.log("Cant. registros:", Array.isArray(rta.data.info) ? rta.data.info.length : 'No-array');
            console.log("status ---->", rta.status);

            if (rta.data.msg === "ER") {
                alert(rta.data.info);
                resetForm();
            } else if (rta.data.info.length > 0) {
                const book = rta.data.info[0];
                setFormData({
                    isbn: book.isbn,
                    titulo: book.titulo,
                    autor: book.autor,
                    tema: book.tema,
                    medioEjemplar: book.medioEjemplar,
                    ubicacionFisica: book.ubicacionFisica,
                    fechaEdicion: book.fechaEdicion,
                    numeroPaginas: book.numeroPaginas,
                    cantidadEjemplares: book.cantidadEjemplares,
                    ejemplaresDisp: book.ejemplaresDisp,
                    resumen: book.resumen
                });
            } else {
                alert("No se encontraron resultados.");
                resetForm();
            }
        } catch (error) {
            console.log("ERROR:", error.message);
        }
    }

    return (
        <div className="menu-container mx-auto">
            <header>
                <div className="titleothers">
                    <h1 className="texto text-light text-center">Actualizar libro</h1>
                </div>
                <div className="subcontainerSecondPage container mx-auto col-lg-12">
                    <Card>
                        <Card.Body>
                            <div className="form text-light">
                                <div className="row">
                                    {Object.keys(formData).map((key) => (
                                        <div key={key}>
                                            <label htmlFor={key} className="rojo">
                                                {`${key.charAt(0).toUpperCase() + key.slice(1).replace(/([A-Z])/g, ' $1')}: `}
                                            </label>
                                            <input
                                                type="text"
                                                name={key}
                                                value={formData[key]}
                                                onChange={(e) => setFormData({...formData, [key]: e.target.value})}
                                            />
                                        </div>
                                    ))}
                                </div>
                            </div>
                            <ButtonGroup className='mt-3'>
                                <Button
                                    className="custom-violent-buttonb"
                                    variant="secondary"
                                    onClick={obtenerInformacionActual}
                                >
                                    Obtener información 
                                </Button>
                                <Button
                                    className="custom-violent-buttonb"
                                    variant="secondary"
                                    onClick={updateLibro}
                                >
                                    Actualizar libro
                                </Button>
                            </ButtonGroup>
                        </Card.Body>
                    </Card>
                </div>
            </header>
        </div>
    );
};

export default UpdateBook;
