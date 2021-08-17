const express=require('express')
const app=express()
const {getUsers,getUser,createUser,setUser,deleteUser,loginUser}=require('./usuarioController')

app.get('/usuarios',async (req,res)=>{
    try {
        let result=await getUsers()
        res.send(result)
    } catch (e) {
        res.send('error en la búsqueda')
    }
})
app.get('/usuarios/:_id',async (req,res)=>{
    try {
        let _id=req.params._id
        let result=await getUser(_id)
        res.send(result)
    } catch (e) {
        res.send('error en la búsqueda: '+e)
    }
})
app.post('/usuarios',async (req,res)=>{
    try {
        let user=req.body
        let result=await createUser(user)
        res.send(result)
    } catch (e) {
        res.send('error en la creación: '+e)
    }
})
app.put('/usuarios',async (req,res)=>{
    try {
        let user=req.body
        let result=await setUser(user)
        res.send(result)
    } catch (e) {
        res.send('error en la actualización')
    }
})
app.delete('/usuarios',async (req,res)=>{
    try {
        let user=req.body
        let result=await deleteUser(user)
        res.send(result)
    } catch (e) {
        res.send('error en la eliminación')
    }
})
app.post('/login',async (req,res)=>{
    try{
        let login=req.body
        let result=await loginUser(login)
        return res.send(result)
    }catch(e){
        res.status(500).send('error login '+e)
    }
})

module.exports=app