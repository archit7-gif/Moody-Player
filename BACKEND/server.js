
const dotenv = require('dotenv')
dotenv.config()

const ConnectDB = require('./src/db/db')
ConnectDB()




const app = require('./src/app')
app.listen(3000,()=>{console.log("server is running on port 3000")})
