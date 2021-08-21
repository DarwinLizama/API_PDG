const express=require('express')
const app=express()
const { check, validationResult } = require('express-validator');
const {getUsers,getUser,createUser,setUser,deleteUser,loginUser}=require('./usuariosControllers')
const {validaJWT}=require('../../middlewares/validaJWT')

app.get('/usuarios',validaJWT,async(req,res)=>{
    const {rol}=req.user
    if(rol!='ADMIN'){
        return res.status(403).json({
            msg:'no autorizado'
        })
    }
    try {
        let result=await getUsers()
        res.json(result)
    } catch (e) {
        res.status(403).json('error en la búsqueda')
    }
})
app.get('/usuarios/:_id',validaJWT,async(req,res)=>{
    const {rol}=req.user
    if(rol!='ADMIN'){
        return res.status(403).json({
            msg:'no autorizado'
        })
    }
    try {
        let _id=req.params._id
        let result=await getUser(_id)
        res.send(result)
    } catch (e) {
        res.send('error en la búsqueda: '+e)
    }
})
app.post('/usuarios',validaJWT,async(req,res)=>{
   
    const {rol}=req.user
    if(rol!='ADMIN'){
        return res.status(403).json({
            msg:'no autorizado'
        })
    }
    try {
        let user=req.body
        let result=await createUser(user)
        res.json(result)
    } catch (e) {
        res.json('error en la creación')
    }
})
app.put('/usuarios',validaJWT,async(req,res)=>{
    const {rol}=req.user
    if(rol!='ADMIN'){
        return res.status(403).json({
            msg:'no autorizado'
        })
    }
    try {
        let user=req.body
        let result=await setUser(user)
        res.send(result)
    } catch (e) {
        res.send('error en la actualización')
    }
})
app.delete('/usuarios',validaJWT,async(req,res)=>{
    const {rol}=req.user
    if(rol!='ADMIN'){
        return res.status(403).json({
            msg:'no autorizado'
        })
    }
    try {
        let user=req.body
        let result=await deleteUser(user)
        res.send(result)
    } catch (e) {
        res.send('error en la eliminación')
    }
})
/**cuenta del usuario**/
app.post('/login',async(req,res)=>{
    try{
        let login=req.body
        let result=await loginUser(login)
        return res.send(result)
    }catch(e){
        res.status(500).send('error login')
    }
})
app.post('/signup',async(req,res)=>{
    try {
        let user=req.body
        let result=await createUser(user)
        res.json(result)
    } catch (e) {
        res.json('error en la creación')
    }
})
app.get('/account',validaJWT,async(req,res)=>{
    const {_id}=req.user
    try {
        let result=await getUser(_id)
        res.send(result)
    } catch (e) {
        res.send('error en la cuenta')
    }
})
app.put('/account',validaJWT,async(req,res)=>{
    const {_id}=req.user
    try {
        let user=req.body
        let result=await setUser(user)
        res.send(result)
    } catch (e) {
        res.send('error en la actualización')
    }
})

module.exports=app