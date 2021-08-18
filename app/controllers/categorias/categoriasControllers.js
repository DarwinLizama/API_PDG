const categoria = require('../../models/categoria');



async function GetCategorias() {
    let data = await categoria.find({});
    return data;
}

async function GetCategoria(id) {
    let data = await categoria.findOne({ id: id });
    return data;
}


async function NewCategoria(categoria) {
    const { id, nombre, estado } = categoria;
    let nuevaCategoria = new categoria({
        id,
        nombre,
        estado     
    })
    let data = await nuevaCategoria.save();   
    console.log(data); 
    return data;

}

async function UpdateCategoria(id, nombre){
    const encontrada = await GetCategoria(id);
    if (encontrada) {
       
        let data = await categoria.UpdateOne({id:id}, {$set:{nombre:categoria.nombre}});
        return data;
    }else {
        console.log("No encontro ningun registro");
    }  
}

async function DeleteCategoria(id){
    let data = await categoria.deleteOne({id});
    return data;
}

module.exports = {
    GetCategorias,
    NewCategoria,
    GetCategoria,
    UpdateCategoria, 
    DeleteCategoria

}