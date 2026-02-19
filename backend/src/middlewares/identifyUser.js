const jwt=require('jsonwebtoken')



async function identifyUser(req,res,next){

    
   // 1. getting the token from the api user
   const token=req.cookies.token

   // 2.if token not found with the user , give him res here itself
   if(!token){
      return res.status(401).json({
         message:"unauthorised access"
      })
   }
   
   // 3. initiating decoded here itself, because we need it outside the context of the try block also
   let decoded=null 
   
   // 4. using jwt verify to get the data of the token --> What does decoded contain? It contains whatever you put inside the token when you created it.
   try{
         decoded=jwt.verify(token , process.env.JWT_SECRET) // only reads the token doesnt look into any db
   }
   // 5. send res 403 if token didnt match
   catch(err){
         return res.status(401).json({
            message:'INVALID TOKEN, UNAUTHORISED'
         })
   }
   
    req.user=decoded
    next()    
}

module.exports=identifyUser

