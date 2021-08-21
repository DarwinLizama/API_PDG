const express = require('express');
const app = express();

const { GetCategorias, NewCategoria, GetCategoria, UpdateCategoria, DeleteCategoria } = require('./categoriasControllers')
const { check } = require('express-validator');
const { validacionesCampos } = require('../../middlewares/validaciones');
const { existeNombreCategoria } = require('../../helpers/validacionesDb')
const { validaJWT } = require('../../middlewares')


async function getCategorias(req, res) {
    try {
        let respuesta = await GetCategorias();
        res.send(respuesta);

    } catch (e) {
        res.send("Error en la busqueda de Categorias!!");
    }
}

async function newCategoria(req, res) {
    try {
        let categoria = req.body;
        console.log(req.body);
        let respuesta = await NewCategoria(categoria);
        //console.log(respuesta);
        res.send(respuesta);
    } catch (e) {
        res.send("Error al ingresar Categoria!!");
    }
}

async function getCategoria(req, res) {
    try {
        let id = req.params.id;
        let respuesta = await GetCategoria(id);
        res.send(respuesta);

    } catch (e) {
        res.send("Error en la busqueda del Categoria!!");
    }
}
async function updateCategoria(req, res){
    try{
    let id = req.params.id; 
    let nombre = req.body.nombre;
    let respuesta = await UpdateCategoria(id,nombre);
    res.send(respuesta);
}catch(e) {
    res.send(`error al modificar categoria`)
}
}


async function deleteCategoria(req, res){
    try{
        let id = req.params.id;
        let respuesta = await DeleteCategoria(id);
        res.send(respuesta);
    }catch (error){
        res.send (`Error al eliminar la categoria`);
    }
}

//Get
app.get("/api/categorias", getCategorias);
app.get("/api/categorias/:id", getCategoria);
//Post
app.post("/api/categorias/", validaJWT, newCategoria);

// app.post("/api/categorias/", [
    
//     check('id', 'El id es obligatorio').not().isEmpty(),
//     check('nombre', 'El nombre es obligatorio').not().isEmpty(),
//     check('nombre').custom(existeNombreCategoria),
//     validacionesCampos
// ], newCategoria);
//PUT
app.put("/api/categorias/:id", validaJWT, updateCategoria);
app.delete("/api/categorias/:id", validaJWT,  deleteCategoria);


module.exports = app;