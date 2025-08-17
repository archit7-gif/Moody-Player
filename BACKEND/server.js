
const dotenv = require('dotenv')
dotenv.config()

const ConnectDB = require('./src/db/db')
ConnectDB()




const app = require('./src/app')
app.listen(process.env.PORT || 3000, () => {
  console.log(`Server running on port ${process.env.PORT || 3000}`);
});


// env

