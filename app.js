require('./app/config/config')

const express = require('express')
const conectarDB = require('./app/config/db')
const app = express()
const cors = require('cors')
const morgan = require('morgan')
const helmet = require('helmet');

//const mongoose = require('mongoose')




// ----- Rama fixture categorias ---------


//Verificar ambiente de trabajo y puerto
const PORT=process.env.PORT || 3000

// Conectar a BAse de Datos
conectarDB()

// habilitar cors
app.use(cors());

app.use(express.json())


//Habilitar para poder usar con el proyecto

//Habilitar morgan
// app.use(morgan('common'))

// app.use(require('./app/routes/routes'))

// app.use(helmet());

app.listen(PORT, () => {

    console.log(`"Servidor en ejecucion en el puerto: ${PORT}!!!!"`);
})