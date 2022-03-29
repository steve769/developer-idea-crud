const express = require('express');
const dotenv = require('dotenv');
const colors = require('colors');
const connectDB = require('./db');
const usersRoute = require('./routes/users');
const ideasRoute = require('./routes/ideas')
const authRoute = require('./routes/auth')
const mongoSanitize = require('express-mongo-sanitize')
const helmet = require('helmet')
//Load in env variables
dotenv.config({path: './config/config.env'});
//Init express
const app = express();

//Express Body Parser
app.use(express.json());

//Call connectDB
connectDB();


//Mounting routers
//User Routes
app.use('/api/v1/users', usersRoute);
app.use('/api/v1/user', usersRoute);
//Idea Routes
app.use('/api/v1/ideas', ideasRoute)
app.use('/api/v1/idea', ideasRoute)
//Setting helmet to prevent XSS
app.use(helmet())
//To prevent noSQL injections
app.use(mongoSanitize())
//Auth Routes
app.use('/api/v1/auth', authRoute)




const PORT = process.env.PORT || 5000;

app.listen(PORT, ()=>{
    console.log(`Server running on ${process.env.NODE_ENV} mode on port ${PORT}`.blue.underline.bold)
});


