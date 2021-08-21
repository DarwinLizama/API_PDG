const express = require('express')
const app = express()
const { CargarArchivo } = require('./uploadsController')
const { validarArchivoSubir } = require('../../middlewares/validarArchivo')

const cargarArchivo = async(req, res) => {
    try {

        console.log(req.file);
        // let img = req.body
        // let respuesta = await CargarArchivo(img)
        // res.send(respuesta)
    } catch (error) {
        res.status(500).send("Hubo un error al guardar!!!")
    }
}

app.post('/api/productos/uploads', cargarArchivo)

module.exports = app
