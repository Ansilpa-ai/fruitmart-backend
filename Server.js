const express  = require('express')
const app = express()

require('dotenv').config()
const dbConnect = require('./Model/DbConnect')
dbConnect()

// const cors = require('cors')
// app.use(cors())

const cors = require("cors");
// Add the frontend URL once deployed
var whitelist = ["https://my-project-frontend-ruby.vercel.app"]; 
var corsOptions = { origin: whitelist, credentials: true };
app.use(cors(corsOptions));


app.use(express.urlencoded({extended:true}))
app.use(express.json())

const path = require('path')
app.use('/uploads',express.static(path.join(__dirname,'uploads')))

const Router = require('./Router/UserRouter')
app.use('/',Router)

const cartRouter = require("./Router/CartRouter")
app.use('/cart',cartRouter)

const AdminRouter = require('./Router/AdminRouter')
app.use('/admin',AdminRouter)


// app.listen(process.env.PORT,()=>{
//           console.log('Server running successfully @http://localhost:9000')
// })

module.exports = app;
