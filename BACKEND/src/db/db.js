

const mongoose = require('mongoose')


const ConnectDB = ()=>{
    mongoose.connect(process.env.MONGODB_URL).then(()=>{
        console.log("Data base connected")
    }).catch((error)=>{
        console.log("error while connecting DB",error)
    })
}


module.exports = ConnectDB