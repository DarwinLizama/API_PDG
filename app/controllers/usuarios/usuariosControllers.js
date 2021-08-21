const usuarios=require('../../models/usuario')
const ObjectId=require('mongoose').Types.ObjectId
const {generaJWT}=require('../../helpers/generaToken')

async function getUsers(){
    const data=await usuarios.find({})
    return data
}
async function getUser(_id){
    const data=await usuarios.findOne({_id:new ObjectId(_id)})
    return data
}
async function createUser(obj){
    const {user,email,clave,estado,rol}=obj
    const data=await usuarios.create({user,email,clave,estado,rol})
    return data
}
async function setUser(obj){
    const {_id,user,email,clave,estado,rol}=obj
    const data=await usuarios.updateOne({_id:new ObjectId(_id)},{$set:{user,email,clave,estado,rol}})
    return data
}
async function deleteUser(obj){
    const {_id,user,email,clave,estado,rol}=obj
    const ok=await usuarios.deleteOne({_id:ObjectId(_id)})
    const data=ok.ok
        ?(await getUser(_id))
        :({
            ok:0
            ,message:'error en la actualizaci�n'})
    return data
}
async function loginUser(login){
    const {user,password}=login
    const data=await usuarios.findOne({user:user,password:password})
    if(!data){
        return {
            status:403,
            mssg:'login incorrecto'
        }
    }
    const token=await generaJWT(data._id,data.user,data.rol)
    return {
        user:data.user,
        rol:data.rol,
        token
    }
}
