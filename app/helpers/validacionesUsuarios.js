const usuarios=require('../models/usuario')
const {ObjectId}=require('mongoose').Types.ObjectId

const existeUsuario=async (user,email,_id)=>{
    const errors=[]
    if(user&&email){
        if(await usuarios.exists({email:email})){
            errors.push({path:'email',msg:`el email "${email}" ya existe`})
            // throw new Error(`el email "${email}" ya existe`)
        }
        if(await usuarios.exists({user:user})){
            errors.push({path:'user',msg:`el usuario "${user}" ya existe`})
            // throw new Error(`el usuario "${user}" ya existe`)
        }
    }
    if(errors.length){
        return {
            status:400,
            msg:errors,
            obj:{}
        }
    }
    return null
}
const validaUpdate=async (obj)=>{
    let errors=[]
    const usuario=new usuarios(obj)
    let err=await usuario.validateSync();
    if(!err){
        await usuarios.findOne({email:obj.email},(err,data)=>{
            if(data._id!==new ObjectId(obj._id)){
                errors.push({path:'email',msg:`el email "${obj.email}" ya existe`})
            }            
        })
        await usuarios.findOne({user:obj.user},(err,data)=>{            
            if(data._id!==obj._id){
                errors.push({path:'email',msg:`el email "${obj.user}" ya existe`})
            }
        })
        // // if(await usuarios.exists({$where:()=>{
        // //     return this.email===obj.email&&this._id!==new ObjectId(obj._id)
        // // }})){
        // // }
        // // if(await usuarios.exists({$where:()=>{
        // //     return false/* this.user===obj.user&&this._id!==new ObjectId(obj._id) */
        // // }})){
        // //     errors.push({path:'user',msg:`el usuario "${obj.user}" ya existe`})
        // // }
    }else{
        // console.log(err)
        errors=Object.values(err.errors).flatMap(function(o){
            const errs=[]
            errs.push({path:o.path,msg:o.message})
            return errs
        })
    }
    if(errors.length){
        return {
            status:400,
            msg:errors,
            obj:{}
        }
    }
    return null
}
const validaDelete=async (obj)=>{
    let errors    
    if(!await usuarios.exists({obj})){
        errors='el usuario no existe'
    }    
    if(errors.length){
        return {
            status:400,
            msg:errors,
            obj:{}
        }
    }
    return null
}
const validaLogin=async (login)=>{
    let errors=[]
    const {user,clave}=login
    if(!user){
        errors.push({path:'user',msg:`usuario requerido`})
    }
    if(!clave){
        errors.push({path:'clave',msg:`contraseña requerida`})
    }
    if(errors.length){
        return {
            status:400,
            msg:errors,
            obj:{}
        }
    }
    return null
}

module.exports={existeUsuario,validaUpdate,validaDelete,validaLogin}