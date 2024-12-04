const dotenv = require('dotenv')
// import userRoutes from './routes/user.routes';
const cookieParser=require('cookie-parser');
dotenv.config();

const userRoutes=require('./routes/user.routes');
const captainRoutes = require('./routes/captain.routes');

const express = require('express');

const app =express();
const cors = require('cors');
const connectToDb = require('./db/db');
connectToDb();

app.use(cors());
//require if body needed to be used in json format
app.use(express.json());
//require is cookie is needed to be parsed in process
app.use(cookieParser());

app.get('/',(req,res) =>{
    res.send("Hello World");
})


app.use('/users',userRoutes);
app.use('/captains',captainRoutes);

module.exports = app;