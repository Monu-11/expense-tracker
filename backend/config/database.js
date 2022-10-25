const mongoose = require('mongoose')

const configureDB = () => {
    mongoose.connect('mongodb://localhost:27017/expense-cal')
           .then(()=>{
            console.log('connected to DB')
           })
           .catch((err)=>{
            console.log('errors in connecting to DB',err)
           })
}

module.exports = configureDB