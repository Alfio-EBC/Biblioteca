const mongoose = require("mongoose");
const express = require("express");
const morgan = require("morgan");
const path = require("path");
const bodyParser = require("body-parser");
const cors = require("cors");

const hostname = "localhost";
const port = 2000;

var bdURL = 'mongodb://127.0.0.1:27017/LibraryDB';
mongoose.connect(bdURL);

mongoose.connection.on('connected', function () {
    console.log("Conexion a mongo realizada en: " + bdURL);
});
mongoose.connection.on('error', function (err) {
    console.log("ERROR: no hay conexion a mongo: " + err);
});
mongoose.connection.on('disconnected', function () {
    console.log("Desconexion a mongo db realizada con exito.");
});

process.on('SIGINT', function () {
    mongoose.connection.close(function () {
        console.log("Conexion con base de datos terminada por finalizacion del servidor.");
        process.exit(0);
    });
});


const app = express();


app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(cors());


// -------------------------------------

require('./server/rutas/libro')(app);


app.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
});
