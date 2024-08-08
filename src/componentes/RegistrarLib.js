import React, { useState } from 'react';
import { Button, ButtonGroup, Card } from 'react-bootstrap';
import '../Estilos.css';
import iAx from '../ConfigAXIOS';

const RegistrarLib = () => {
    const [formValues, setFormValues] = useState({
        ISBN: '',
        titulo: '',
        autor: '',
        fechaedicion: '',
        numeropaginas: '',
        cantidadejemplares: '',
        disponibles: '',
        resumen: '',
        medio: '',
        tema: '',
        ubicacion: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormValues({ ...formValues, [name]: value });
    };

    const clearForm = () => {
        setFormValues({
            ISBN: '',
            titulo: '',
            autor: '',
            fechaedicion: '',
            numeropaginas: '',
            disponibles: '',
            cantidadejemplares: '',
            resumen: '',
            medio: '',
            tema: '',
            ubicacion: ''
        });
    };

    const createLibro = async () => {
        try {
            const data = {
                isbn: formValues.ISBN,
                titulo: formValues.titulo,
                autor: formValues.autor,
                fechaEdicion: formValues.fechaedicion,
                numeroPaginas: formValues.numeropaginas,
                cantidadEjemplares: formValues.cantidadejemplares,
                resumen: formValues.resumen,
                medioEjemplar: formValues.medio,
                ejemplaresDisp: formValues.disponibles,
                ubicacionFisica: formValues.ubicacion,
                tema: formValues.tema,
            
            };
            const rta = await iAx.post('/createLibro', JSON.stringify(data));
            if (rta.data.msg === "ER") {
                alert(rta.data.info);
                console.log("No se ha podido crear el registro");
            } else {
                alert(rta.data.info);
                clearForm();
            }
        } catch (error) {
            console.log("ERROR: " + error.message);
        }
    };

    return (
        <div className="menu-container container">
            <header>
                <div className="titleothers">
                    <h1 className="text-center text-light">Registra tu libro nuevo</h1>
                </div>
                <div className="subcontainerSecondPage">
                    <Card className="form-card">
                        <Card.Body>
                            <div className="form">
                                <div className="row">
                                    {Object.entries(formValues).map(([key, value]) => (
                                        <div key={key} className="form-group">
                                            <label htmlFor={key} className="rojo">{key.replace(/([A-Z])/g, ' $1').toUpperCase()}: </label>
                                            <input
                                                type="text"
                                                name={key}
                                                value={value}
                                                onChange={handleChange}
                                                className="form-control"
                                            />
                                        </div>
                                    ))}
                                </div>
                            </div>
                            <ButtonGroup>
                                <Button className="custom-violent-buttonb mt-3" variant="secondary" onClick={createLibro}>Ingresa tu libro</Button>
                            </ButtonGroup>
                        </Card.Body>
                    </Card>
                </div>
            </header>
        </div>
    );
};

export default RegistrarLib;
