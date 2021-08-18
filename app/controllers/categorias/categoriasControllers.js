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
    let data = await categorias.updateOne({id:id}, {$set:{nombre:nombre}});
    console.log(data);
    return data;
}
/* async function UpdateCategoria(id, nombre){
    const encontrada = await GetCategoria(id);
    if (encontrada) {
       console.log("registro encontrado");
       console.log(encontrada);
        let data = await categorias.updateOne({id:id}, {$set:{nombre:nombre}});
        console.log(data);
        return data;
    }else {
        console.log("No encontro ningun registro");
    }  
} */

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