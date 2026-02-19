require('dotenv').config()
const connectToDB=require('./src/config/db')
const app=require('./src/app')

async function runServer(){
    await connectToDB()

  
    app.listen(3000,()=>{
    console.log("server running on port 3000")
    })
}

runServer()
