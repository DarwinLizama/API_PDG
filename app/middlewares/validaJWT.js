const jwt=require('jsonwebtoken')

const validaJWT=(req,res,next)=>{
    const token=req.header('x-token')
    if(!token){
        return res.status(403).json({
            msg:'no hay teken'
        })
    }
    jwt.verify(token,process.env.SECRETKEY,(err,user)=>{
        if(err){
            return res.status(403).json({
                status:403,
                msg:'token inválido',
                obj:{}
            })
        }
        req.user=user
        next()
    })
}

module.exports={validaJWT}
