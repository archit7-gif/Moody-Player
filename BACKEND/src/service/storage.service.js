

var Imagekit = require("imagekit")
var Mongoose = require('mongoose')

var imagekit = new Imagekit({
    publicKey: process.env.IMAGEKIT_PUBLIC_KEY,
    privateKey : process.env.IMAGEKIT_PRIVATE_KEY,
    urlEndpoint : process.env.IMAGEKIT_URL_ENDPOINT 
})


const UploadFile = (file) =>{
    return new Promise((res,rej)=>{
    imagekit.upload({
        file:file.buffer,
        fileName : new Mongoose.Types.ObjectId().toString(),
        folder : "Cohort-Audio"
    },(error,result)=>{
        if(error){
        rej(error)
        }else{
        res(result)
        }
    })
    })
}

module.exports = UploadFile