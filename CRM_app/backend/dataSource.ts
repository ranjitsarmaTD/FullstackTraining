import "reflect-metadata";
import { DataSource } from "typeorm";
import { User } from "./entity/User"
import { Leaves } from "./entity/Leaves";
import { LeaveBalance } from "./entity/LeaveBalance";
import { Salary } from "./entity/Salary";

import * as dotenv from "dotenv";

dotenv.config();

export const AppDataSource = new DataSource({
  type: process.env.DB_TYPE! as "postgres",
  host: process.env.DB_HOST!,
  port: Number(process.env.DB_PORT!),
  username: process.env.DB_USERNAME!,
  password: process.env.DB_PASSWORD!,
  database: process.env.DB_NAME!,
  synchronize: process.env.DB_SYNCHRONIZE === "true",
  logging: process.env.DB_LOGGING === "true",
  entities: [User, Leaves, LeaveBalance, Salary],
});