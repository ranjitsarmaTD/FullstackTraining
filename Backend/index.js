import "reflect-metadata"
import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import db from "./utility/db.js";
import authRouter from "./routes/auth.route.js";
import deptRouter from "./routes/dept.route.js";
import empRouter from "./routes/emp.route.js";

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: true}))
dotenv.config();

const PORT = process.env.PORT;

// Database connection
db()
.then(() => {
    // server connection
    app.listen(PORT, () => {
        console.log(`server is running on port ${PORT}`);
    })
})
.catch((err) => {
    console.log(err);
});

app.use("/api/auth", authRouter);
app.use('/api/dept', deptRouter);
app.use('/api/emp', empRouter);
app.get("/", (req, res) => {
    res.send("all good");
})

