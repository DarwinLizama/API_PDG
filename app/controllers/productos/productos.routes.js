const express = require('express')
const app = express()
const { GetProductos, NewProductos, DeleteProducto } = require('./productosControllers')

const getProductos = async (req, res) => {
    try {
        let respuesta = await GetProductos()
        res.send(respuesta)
    } catch (error) {
        res.send("Error en la busqueda de Productos!!")
    }
}

const newProductos = async(req, res) =>{
    try {
        let producto = req.body
        console.log(producto)
        let respuesta = await NewProductos(producto)
        res.send(respuesta)
    } catch (error) {
        res.status(500).send("Hubo un error al guardar!!!")
    }
}

const deleteProductos = async(req, res) => {
    try {
        let producto = req.body
        console.log();
        let respuesta = await DeleteProducto(producto)
        res.send(respuesta)
    } catch (error) {
        
    }
}


app.get('/api/productos', getProductos)

app.post('/api/productos', newProductos)

module.exports = app