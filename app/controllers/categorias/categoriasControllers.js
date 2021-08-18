const categorias = require('../../models/categoria');



async function GetCategorias() {
    let data = await categorias.find({});
    return data;
}

async function GetCategoria(id) {
    let data = await categorias.findOne({ id: id });
    return data;
}


async function NewCategoria(categoria) {
    const { id, nombre, estado } = categoria;
    let nuevaCategoria = new categorias({
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
       
        let data = await categorias.UpdateOne({id:id}, {$set:{nombre:categorias.nombre}});
        return data;
    }else {
        console.log("No encontro ningun registro");
    }  
}

async function DeleteCategoria(id){
    let data = await categorias.deleteOne({id});
    return data;
}

module.exports = {
    GetCategorias,
    NewCategoria,
    GetCategoria,
    UpdateCategoria, 
    DeleteCategoria

}