import app from "./app";
import { AppDataSource } from "./dataSource";
import dotenv from "dotenv";

dotenv.config();
//Initializes the data base connection AND then starts to listen to the server here.

AppDataSource.initialize()
  .then(() => {
    console.log("Database connected");

    app.listen(4000, () => {
      console.log("Server running on port 4000");
    });
  })
  .catch((err) => {
    console.error("DB connection failed", err);
  });
