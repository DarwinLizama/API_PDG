const express = require('express');
const app = express();

const { GetCategorias, NewCategoria, GetCategoria, UpdateCategoria, DeleteCategoria } = require('./categoriasControllers')
const { check } = require('express-validator');
const { validacionesCampos } = require('../../middlewares/validaciones');
const { existeNombreCategoria } = require('../../helpers/validacionesDb')
//const { validaJWT } = require('../../middlewares/validaJWT')


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

async function updateCategoria(req, res) {
    let id = req.params.id;
    let categoria = req.body;
    let respuesta = await UpdateCategoria(id,categoria);
    res.send(respuesta);
}

async function deteteCategoria(req, res){
    try{
        let id = req.params.id;
        let respuesta = await DeleteCategoria(id);
        res.send(respueta);
    }catch (error){
        res.send (`Error al eliminar la categoria`);
    }
}

//Get
app.get("/api/categorias", getCategorias);
app.get("/api/categorias/:id", getCategoria);
//Post
app.post("/api/categorias/", newCategoria);

// app.post("/api/categorias/", [
    
//     check('id', 'El id es obligatorio').not().isEmpty(),
//     check('nombre', 'El nombre es obligatorio').not().isEmpty(),
//     check('nombre').custom(existeNombreCategoria),
//     validacionesCampos
// ], newCategoria);
//PUT
app.put("/api/categorias/:id",updateCategoria);


module.exports = app;