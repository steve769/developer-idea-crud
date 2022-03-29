const fs = require('fs')
const mongoose = require('mongoose')
const dotenv = require('dotenv')
const colors = require('colors')
const User = require('./models/User')
const Idea = require('./models/Idea')



//Bring in the config file for DB Connection
dotenv.config({path: './config/config.env'})


//Establish a DB connection
mongoose.connect(process.env.MONGODB_URI, {
            useNewUrlParser: true,
        });
    
//Function to load data to DB from local file
const importDataToDB = async () =>{

    const userData = await User.create(JSON.parse(fs.readFileSync(`${__dirname}/data/users.json`, 'utf-8')))
    const ideaData = await Idea.create(JSON.parse(fs.readFileSync(`${__dirname}/data/ideas.json`, 'utf-8')))
    console.log("Database seeded".inverse.green)
    process.exit()

    

}
//Function to destroy data in the database
const deleteDataFromDB = async () =>{

    await User.deleteMany()
    await Idea.deleteMany()
    console.log("Database unseeded".inverse.red)
    process.exit()

   
    
}
//Check passed in args
if(process.argv[2] === '-i'){
    importDataToDB()
}else if(process.argv[2]=== '-d'){
    deleteDataFromDB()
}