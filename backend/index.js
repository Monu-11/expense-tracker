const express=require('express')
const port =3070
const app=express()
const cors=require('cors')
app.use(cors())
app.use('/images',express.static('images'))
const configureDB = require('./config/database')


app.use(express.json())
configureDB()

const router=require('./config/routes')
app.use(router)

app.listen(port,()=>{
    console.log('server is running on port',port)
})
