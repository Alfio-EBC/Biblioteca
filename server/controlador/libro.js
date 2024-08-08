var mongoose = require('mongoose');
var Libro = require("../modelo/libro");

exports.getAllLibros = function (req, res) {
    try {
        Libro.find({})
            .then((rta) => {
                console.log("Rta: " + rta);
                res.send({msg: "OK", info: rta});
            })
            .catch(err => {
                console.log("ERR: " + err);
                res.send({msg: "ERR", info: "Información no disponible, intente mas tarde"});
            });
    } catch (err) {
        console.log("ERROR consultando libros: " + err);
    }
};



exports.createLibro = function (req, res) {
    try {
        console.log("Inicia proceso de creacion de libro");
        var newLibro = new Libro({
            isbn: req.body.isbn,
            titulo: req.body.titulo,
            autor: req.body.autor,
            fechaEdicion: req.body.fechaEdicion,
            numeroPaginas: req.body.numeroPaginas,
            cantidadEjemplares: req.body.cantidadEjemplares,
            ejemplaresDisp: req.body.ejemplaresDisp,
            resumen: req.body.resumen,
            medioEjemplar: req.body.medioEjemplar,
            tema: req.body.tema,
            ubicacionFisica: req.body.ubicacionFisica
        });
        newLibro.save().then(() => {
            console.log(`Se ha creado un nuevo libro bajo el isbn: ${newLibro._id}`);
            res.send({msg: "OK", info: `Libro creado con exito con isbn : ${newLibro.isbn}`});
        })
            .catch(err => {
                console.log("ERROR: " + err);
                res.send({msg: "ER", info: "El libro no se ha creado con exito, intente nuevamente"})
            });
    } finally {
        console.log("Se ha finalizado el proceso de creación del libro");
    }
}

exports.getLibro = function (req, res) {
    try {
        console.log("Info" + req.body.isbn);

        Libro.find({isbn: req.body.isbn})
            .then((rta) => {
                console.log("Rta:", JSON.stringify(rta));
                res.send({msg: "OK", info: rta});
            })
            .catch(err => {
                console.log("ER:", err);
                res.status(500).send({msg: "ER", info: "Información no disponible, intente más tarde"});
            });
    } catch (err) {
        console.log("ERROR consultando libro:", err);
        res.status(500).send({msg: "ER", info: "Error interno del servidor"});
    }
};



exports.updateLibro = function (req, res) {
    try {
        console.log("Inicia proceso de actualizacion de libro");
        Libro.updateOne({isbn: req.body.isbn}, {
            $set: {
                titulo: req.body.titulo,
                autor: req.body.autor,
                fechaEdicion: req.body.fechaEdicion,
                numeroPaginas: req.body.numeroPaginas,
                cantidadEjemplares: req.body.cantidadEjemplares,
                ejemplaresDisp: req.body.ejemplaresDisp,
                resumen: req.body.resumen,
                medioEjemplar: req.body.medioEjemplar,
                tema: req.body.tema,
                ubicacionFisica: req.body.ubicacionFisica
            }
        })
            .then((rta) => {
                if (rta.modifiedCount < 1) {
                    res.status(404).send({msg: "OK", info: "El libro que digital no existe"});
                    return;
                }
                res.send({msg: "OK", info: "El libro ha sido actualizado"});
            })
            .catch(err => {
                console.log("ER: " + err);
                res.status(500).send({msg: "ER", info: "Informacion no disponible"});
            })
    } catch (err) {
        console.log("Error al momento de actualizar libro: " + err);
        res.status(500).send({msg: "ER", info: "Error interno del servidor"});
    }
};


exports.delLibro = function (req, res) {
    try {
        console.log("Info " + req.body.isbn);

        Libro.deleteOne({isbn: req.body.isbn})
            .then((rta) => {
                console.log("Rta: ", JSON.stringify(rta));
                res.send({msg: "OK", info: rta});
            })
            .catch(err => {
                console.log("ER: ", err);
                res.status(500).send({
                    msg: "ER",
                    info: "Ha ocurrido un error"
                });
            });
    } catch (err) {
        console.log("EROR eliminando libro: ", err);
        res.status(500).send({msg: "ER", info: "Error interno del servidor"})
    }
};




