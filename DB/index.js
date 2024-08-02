const  mongoose= require("mongoose");
require('dotenv').config();

// const URL= ''

const connectDB = async()=>{
    try {
        await mongoose.connect(`${process.env.MONGODB_URL}`);
        console.log('Successfully connected to MongoDB Atlas!');
    } catch (error) {
        console.log("mongoose Connection",error);
        process.exit(1)
    }
}

module.exports = connectDB;