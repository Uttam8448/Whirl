const dotenv = require('dotenv')
// import userRoutes from './routes/user.routes';

dotenv.config();

const userRoutes=require('./routes/user.routes');
const express = require('express');

const app =express();
const cors = require('cors');
const connectToDb = require('./db/db');
connectToDb();

app.use(cors());

app.get('/',(req,res) =>{
    res.send("Hello World");
})

app.use(express.json());
app.use('/users',userRoutes);

module.exports = app;