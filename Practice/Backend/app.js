
const dotenv = require('dotenv');
const mongoose = require('mongoose');


const e = require('express');
const express = require('express');
const app = express();
dotenv.config({path:'./config.env'})
require('./DB/connection.js');
//const User = require("./DB/model/userschema");
//Linking router files to make route easier
app.use(express.json()); //to convert any json data to readable format
app.use (require('./Router/auth'));
const Port = process.env.PORT;

//Middleware
// const middleWare =(req,res,next) => {
// console.log("Hello my Middleware");
// next();
// }

app.get('/', (req, res) => {
    res.send('Hello world');
});

app.get('/aboutus', (req, res) => {
    res.send('About us');
});

app.get('/news', (req, res) => {
    res.send('News');
});

app.get('/checklist', (req, res) => {
    res.send('checklist');
});

app.get('/logIn', (req, res) => {
    res.send('LogIn');
});

app.get('/register', (req, res) => {
    res.send('Register');
});

app.listen(Port, () => {
    console.log('Server runningat 3000');
});