import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import authRoutes from "./routes/auth.routes";
import userRoutes from "./routes/users.routes";
import leavesRoutes from "./routes/leaves.routes";
import salaryRoutes from "./routes/salary.routes"

//app is exported from here to server.ts
const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({extended: true}))

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

app.use("/auth", authRoutes);
app.use("/users",userRoutes)
app.use("/leaves", leavesRoutes)
app.use("/salary",salaryRoutes)

export default app;
