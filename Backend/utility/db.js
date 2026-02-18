import { DataSource } from "typeorm";
import User from "../entities/user.js"
import Dept from "../entities/dept.js";
import { configDotenv } from "dotenv";

configDotenv();

export const AppDataSource = new DataSource({
    type: "postgres",
    url: process.env.DB_URL.trim(),
    ssl: true,
    entities: [User, Dept],
    synchronize: true
})

async function db(){
    
    try {
        await AppDataSource.initialize();
        console.log("Connected To DB");
    } catch (error) {
        throw new Error(error.message);
    }
}

export default db;