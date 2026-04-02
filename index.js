require("dotenv").config()
const express = require('express')
const app = express()
const db = require('./src/config/db')

db()
app.use(express.json()) // use the mmiddleware builtin

// import routes
const authRoutes = require('./src/routes/Auth.route');
const userRoutes = require('./src/routes/User.routes');
const recordRoutes = require('./src/routes/finance.route');
const analyticsRoutes = require('./src/routes/Analytical.route');

// use the routes
app.use('/auth', authRoutes);         
app.use('/users', userRoutes);        
app.use('/records', recordRoutes);  
app.use('/analytics', analyticsRoutes);


app.get('/',(req,res)=>{
    res.status(200).send("welcome to our home")
})

const PORT = process.env.PORT
app.listen(PORT,()=>{
    console.log("Server is start")
})