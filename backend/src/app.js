const express=require('express')
const cookieParser=require('cookie-parser')
const multer=require('multer')
const cors = require('cors')



const authRouter=require('./routes/auth.routes')
const postRouter=require("./routes/post.routes")

const app=express()
app.use(cors({
    credentials:true,
    origin:"http://localhost:5173"
}))
// we have to tell cors where we are saving cookies , as we have set credentials true

app.use(express.json())
app.use(cookieParser())

app.use('/api/auth', authRouter)
app.use("/api/posts", postRouter)


module.exports=app