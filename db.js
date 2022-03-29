const mongoose = require('mongoose');



const connectDB = async () => {
    try {
        //If DB connects successfully
        const connect = await mongoose.connect(process.env.MONGODB_URI, {
            useNewUrlParser: true,
        });
        console.log("MongoBD Connceted successfully".cyan.underline.bold);
    } catch (error) {
        //If DB connection fails
        console.log("DB conncetion failure".red.underline);
        process.exit(1);
    }
}

module.exports = connectDB;