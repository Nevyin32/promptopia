import mongoose from "mongoose";

let isConnected = false;

export const connectToDB = async () => {
    mongoose.set('strictQuery', true);

    if (isConnected){
        console.log("DB connection already connected.");
        return;
    }
    try{
        const MONGODB = process.env.MONGODB_URI;
        await mongoose.connect(MONGODB, {
            dbName:"share_prompt",
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log("Connected to MongoDB.");
        isConnected = true;
        
    }catch(error){
        console.log(error);
    }
}