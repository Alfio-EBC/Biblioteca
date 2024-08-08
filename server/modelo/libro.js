
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var schLibro = new Schema({
    isbn: {type: String, Required: 'ISBN'},
    autor: {type: String, Required: 'Autor'},
    titulo: {type: String, Required: 'Titulo'},
    fechaEdicion:  {type: String, Required: 'Fecha'},
    numeroPaginas:  {type: String, Required: 'Numero'},
    cantidadEjemplares:  {type: String, Required: 'Cantidad de ejemplares'},
    ejemplaresDisp:  {type: String, Required: 'Ejemplares disponibles'},
    resumen:  {type: String, Required: 'Resumen es obligatorio'},
    medioEjemplar:  {type: String, Required: 'Medio de ejemplar'},
    tema:  {type: String, Required: 'tema'},
    ubicacionFisica:  {type: String, Required: 'Ubicacion fisica'},
});

const Libros = mongoose.model('Libros', schLibro, 'biblioteca');

module.exports = Libros;
