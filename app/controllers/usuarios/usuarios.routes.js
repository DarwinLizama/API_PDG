const express=require('express')
const app=express()
const { check, validationResult } = require('express-validator');
const {getUsers,getUser,createUser,setUser,deleteUser,loginUser}=require('./usuariosControllers')
const {validaJWT}=require('../../middlewares/validaJWT')
const {validaCamposUsuarios}=require('../../middlewares/validacionesUsuarios')
const {existeUsuario,validaUpdate,validaDelete,validaLogin}=require('../../helpers/validacionesUsuarios')

app.get('/usuarios'
    ,validaJWT
    ,async(req,res)=>{
    const {rol}=req.user
    if(rol!='ADMIN'){
        return res.status(401).json({
            status:401,
            msg:'no autorizado',
            obj:{}
        })
    }
    let result
    try{
        result=await getUsers()
    }catch(err){
        result={
            status:403,
            msg:err.toString(),
            obj:{}
        }
    }
    res.status(result.status).json(result)
})
app.get('/usuarios/:_id'
    ,validaJWT
    ,async(req,res)=>{
    const {rol}=req.user
    if(rol!='ADMIN'){
        return res.status(401).json({
            status:401,
            msg:'no autorizado',
            obj:{}
        })
    }
    let _id=req.params._id
    let result
    try{
        result=await getUser(_id)
    }catch(err){
        result={
            status:403,
            msg:err.toString(),
            obj:{}
        }
    }
    res.status(result.status).send(result)
})
app.post('/usuarios'
    ,validaJWT
    ,(req,res,next)=>{
        check('user','el "usuario" es obligatorio').not().isEmpty()
        check('email','el "email" es obligatorio').not().isEmpty().isEmail()
        check('clave','la "contraseña" es obligatoria').not().isEmpty()
        check('estado','el "estado" es obligatorio').not().isEmpty().isBoolean()
        check('rol','el "rol" es obligatorio').not().isEmpty()
        validaCamposUsuarios
        next()
    }
    ,async(req,res)=>{
    const {rol}=req.user
    const usuario=req.body
    if(rol!='ADMIN'){
        return res.status(401).json({
            status:401,
            msg:'no autorizado',
            obj:{}
        })
    }
    let result
    try{
        result=await existeUsuario(usuario.user,usuario.email)
        if(!result){
            result=await createUser(usuario)
        }
    }catch(err){
        result={
            status:403,
            msg:Object.values(err.errors).flatMap(function(o){
                const errs=[]
                errs.push({path:o.path,msg:o.message})
                return errs
            }),
            obj:{}
        }
    }
    res.status(result.status).json(result)
})
app.put('/usuarios'
    ,validaJWT
    ,(req,res,next)=>{
        check('user','el "usuario" es obligatorio').not().isEmpty()
        check('email','el "email" es obligatorio').not().isEmpty().isEmail()
        check('clave','la "contraseña" es obligatoria').not().isEmpty()
        check('estado','el "estado" es obligatorio').not().isEmpty().isBoolean()
        check('rol','el "rol" es obligatorio').not().isEmpty()
        validaCamposUsuarios
        next()
    }
    ,async(req,res)=>{
    const {rol}=req.user
    if(rol!='ADMIN'){
        return res.status(401).json({
            status:401,
            msg:'no autorizado',
            obj:{}
        })
    }
    let usuario=req.body
    let result
    try{
        result=await validaUpdate(usuario)
        if(!result){
            result=await setUser(usuario)
        }
    }catch(err){
        result={
            status:403,
            msg:err,
            // msg:Object.values(err.errors).flatMap(function(o){
            //     const errs=[]
            //     errs.push({path:o.path,msg:o.message})
            //     return errs
            // }),
            obj:{}
        }
    }
    res.status(result.status).send(result)
})
app.delete('/usuarios'
    ,validaJWT
    ,async(req,res)=>{
    const {rol}=req.user
    if(rol!='ADMIN'){
        return res.status(401).json({
            status:401,
            msg:'no autorizado',
            obj:{}
        })
    }
    let usuario=req.body
    let result
    try{
        result=await validaDelete(usuario)
        console.log('llegue hasta aca')
        if(!result){
            result=await deleteUser(usuario)
        }
    }catch(err){
        result={
            status:403,
            msg:Object.values(err.errors).flatMap(function(o){
                const errs=[]
                errs.push({path:o.path,msg:o.message})
                return errs
            }),
            obj:{}
        }
    }
    res.status(result.status).send(result)
})
/**cuenta del usuario**/
app.post('/login',async(req,res)=>{
    let login=req.body    
    let result
    try{
        result=await validaLogin(login)
        if(!result){
            result=await loginUser(login)
        }
    }catch(err){
        result={
            status:403,
            msg:Object.values(err.errors).flatMap(function(o){
                const errs=[]
                errs.push({path:o.path,msg:o.message})
                return errs
            }),
            obj:{}
        }
    }
    res.status(result.status).send(result)
})
app.post('/signup'
    ,(req,res,next)=>{
        check('user','el "usuario" es obligatorio').not().isEmpty()
        check('email','el "email" es obligatorio').not().isEmpty().isEmail()
        check('clave','la "contraseña" es obligatoria').not().isEmpty()
        check('estado','el "estado" es obligatorio').not().isEmpty().isBoolean()
        check('rol','el "rol" es obligatorio').not().isEmpty()
        validaCamposUsuarios
        next()
    }
    ,async(req,res)=>{
    let usuario=req.body
    let result
    try{
        result=await existeUsuario(usuario.user,usuario.email)
        if(!result){
            result=await createUser(usuario)
        }
    }catch(err){
        result={
            status:403,
            msg:Object.values(err.errors).flatMap(function(o){
                const errs=[]
                errs.push({path:o.path,msg:o.message})
                return errs
            }),
            obj:{}
        }
    }
    res.status(result.status).json(result)
})
app.get('/account',validaJWT,async(req,res)=>{
    const {_id}=req.user
    let result
    try{
        result=await getUser(_id)
    }catch(err){
        result={
            status:403,
            msg:err.toString(),
            obj:{}
        }
    }
    res.status(result.status).send(result)
})
app.put('/account'
    ,validaJWT
    ,(req,res,next)=>{
        check('user','el "usuario" es obligatorio').not().isEmpty()
        check('email','el "email" es obligatorio').not().isEmpty().isEmail()
        check('clave','la "contraseña" es obligatoria').not().isEmpty()
        check('estado','el "estado" es obligatorio').not().isEmpty().isBoolean()
        check('rol','el "rol" es obligatorio').not().isEmpty()
        validaCamposUsuarios
        next()
    }
    ,async(req,res)=>{
    const {_id}=req.user
    let usuario=req.body
    let result
    try{
        result=await validaUpdate(usuario)
        if(!result){
            result=await setUser(usuario)
        }
    }catch(err){
        result={
            status:403,
            msg:err,
            // msg:Object.values(err.errors).flatMap(function(o){
            //     const errs=[]
            //     errs.push({path:o.path,msg:o.message})
            //     return errs
            // }),
            obj:{}
        }
    }
    res.status(result.status).send(result)
})

module.exports=app