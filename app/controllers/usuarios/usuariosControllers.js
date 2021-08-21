const usuarios=require('../../models/usuario')
const {ObjectId}=require('mongoose').Types.ObjectId
const {generaJWT}=require('../../helpers/generaToken')
const {existeUsuario}=require('../../helpers/validacionesUsuarios')

async function getUsers(){
    const data=await usuarios.find({})
    return {
        status:200,
        msg:data.length?'OK':'no hay registros',
        obj:data
    }    
}
async function getUser(_id){
    if(!ObjectId.isValid(_id)){
        return {
            status:400,
            msg:'identificador inválido',
            obj:{}
        }
    }
    const data=await usuarios.findOne({_id:new ObjectId(_id)})
    return {
        status:200,
        msg:data?'OK':'no hay registro',
        obj:data||{}
    }
}
async function createUser(obj){
    const {user,email,clave,estado,rol}=obj
    const data=await usuarios.create({user,email,clave,estado,rol})
    return {
        status:200,
        msg:'OK',
        obj:data
    }
}
async function setUser(obj){
    const {_id,user,email,clave,estado,rol}=obj
    if(!ObjectId.isValid(_id)){
        return {
            status:400,
            msg:'identificador inválido',
            obj:{}
        }
    }
    const data=await usuarios.updateOne({_id:new ObjectId(_id)},{$set:{user,email,clave,estado,rol}})
    return {
        status:200,
        msg:'OK',
        obj:data
    }
}
async function deleteUser(obj){
    const {_id,user,email,clave,estado,rol}=obj
    const data=await usuarios.deleteOne({_id:ObjectId(_id)})
    return {
        status:200,
        msg:'OK',
        obj:data
    }
}
async function loginUser(login){
    const {user,password}=login
    const data=await usuarios.findOne({user:user,password:password},(err,data)=>{
        if(err){
            return {
                status:400,
                msg:'error: '+err,
                obj:{}
            }
        }
        if(!data){
            return {
                status:400,
                msg:'login incorrecto',
                obj:{}
            }
        }
    })    
    return generaJWT(data)
}

module.exports={getUsers,getUser,createUser,setUser,deleteUser,loginUser}