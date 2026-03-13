require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');

//start app
const app = express();

//routers import
const schoolRouter = require("./routers/school.router")

//use middlewares
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cors());
app.use(cookieParser());

//mongodb connection
mongoose.connect(`mongodb://localhost:27017/multipleSchools`).then( db => {
    console.log("Mongodb connected successfully")
}).catch( e => {
    console.log("Mongodb error", e)
})


//use routers
app.use('/api/school', schoolRouter)

//import the env variables (PORT, ...) from .env
const PORT = process.env.PORT;


//use the imported variables
app.listen(PORT, () => {
    console.log('Server is running on port: ', PORT)
})

