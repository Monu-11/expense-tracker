const express=require('express')
const port =3050
const app=express()
const cors=require('cors')
app.use(cors())
app.use('/images',express.static('images'))
const configureDb=require('./config/database')
configureDb()
app.use(express.json())
const router=require('./config/routes')
app.use(router)

app.listen(port,()=>{
    console.log('server is running on port',port)
})
