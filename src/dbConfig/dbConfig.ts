import mongoose from "mongoose";

export async function connect() {
  try {
    if (!process.env.DATABASE_URI) {
      throw new Error("DATABASE_URI is not defined");
    }
    mongoose.connect(process.env.DATABASE_URI)
    const connection = mongoose.connection;
    connection.on('connected', ()=>{
      console.log('database connected successfully')
    });

    connection.on('error', ()=>{
      console.log('error while connecting to database');
      process.exit()
    });
  } catch (error) {
    console.log(error)
  }
}