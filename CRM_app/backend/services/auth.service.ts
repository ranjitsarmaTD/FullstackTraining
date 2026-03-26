import { AppDataSource } from "../dataSource";
import { User } from "../entity/User";
import { hash, compare } from "bcrypt";

const userRepo = AppDataSource.getRepository(User);

//will be required in HR admin side
export async function signupUser(
  employeeId: string,
  email: string,
  password: string,
  name: string,
  role: "hr" | "admin" | "employee",
  dob: string,
  joiningDate: string,
  location: string,
) {
  const hashed = await hash(password, 10);
  // const uuid= await uuidGenerate;

  const user = userRepo.create({
    employeeId,
    email,
    password: hashed,
    name,
    role,
    dob:new Date(dob),
    joiningDate:new Date(joiningDate),
    location,
  });

  return userRepo.save(user);
}

//general login
export async function loginUser(
  role: "hr" | "admin" | "employee",
  employeeId: string,
  password: string,
) {
  console.log("In login service");

  const user = await userRepo.findOneBy({ employeeId });
  console.log("User found:", user);
  if (!user) throw new Error("Invalid credentials:User Not found");

  const valid = await compare(password, user.password);
  console.log("Password valid:", valid);
  if (!valid) throw new Error("Invalid credentials:Password Wrong");

  return user; //this is all the data of the entity user
}
