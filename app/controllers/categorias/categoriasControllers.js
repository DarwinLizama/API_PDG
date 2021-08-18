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
    //console.log(`categoria`)
    const { id, nombre } = categoria;
    let nuevaCategoria = new categoria({
        id,
        nombre      
    })
    let data = await nuevaCategoria.save();
    //console.log(data);
    return data;

}

async function UpdateCategoria(id, nombre){
    const encontrada = await GetCategoria(id);
    if (encontrada) {
        console.log("entro");
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

/* const GetPaises = async ()=>{

} */