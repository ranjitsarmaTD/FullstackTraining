import app from "./app";
import { AppDataSource } from "./dataSource";

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
