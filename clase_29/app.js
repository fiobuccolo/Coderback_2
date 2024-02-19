import express  from "express";
import config from "./config/config.js";
import MongoSingleton from "./config/mongodb-singleton.js";
import cors from cors

//import routers:

const app = express();

//JSON settings

//Declaracion de routes


const SERVER_PORT = config.port

app.listen(SERVER_PORT,()=>
console.log(`Server listening on port: ${SERVER_PORT}`)) 

//levantamos instancia de MONGO
const mongoInstance = async() =>{
    try {
        await MongoSingleton.getInstance()
    } catch (error) {
        console.error(error);
    }
}