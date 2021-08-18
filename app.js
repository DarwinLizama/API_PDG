require("./app/config/config");
const express = require('express');
const bodyParser = require('body-parser')
const mongoose = require('mongoose');
const cors = require('cors')
const morgan = require('morgan');
const helmet = require('helmet');
const app = express();
const server = require('http').createServer(app);
//const io = require('socket.io')(server);
//const { socketController } = require('./sockets/socket-server')

app.use(cors());
app.use(express.urlencoded({ extended: false }))
app.use(express.json())
app.use(morgan("common"));
app.use(helmet());
app.use(express.static('public'));


const PORT = process.env.PORT || 3000;

/* app.use(function(req, res, next) {
    //req.username = req.query.nombre.toUpperCase();
    //console.log("Entro al Middleware " + req.username);
    console.log(`Hora de ingreso al Server :${ Date.now() }`);
    req.query.nombre = req.query.nombre.toUpperCase();
    req.query.rol = "PUBLIC";
    next();
}) */

// EJS - PUG - HBS 

app.use(require('./app/routes/routes'));


//io.on('connection', socketController);

mongoose.connect(process.env.Mongo, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(resp => {
    console.log("Conexion realizada correctamente!!");
}).catch(resp => {
    console.log("Error en la conexion!!");
})

server.listen(PORT, () => {
    console.log(`Servidor en ejecucion en el puerto:${PORT}!!!`);
})