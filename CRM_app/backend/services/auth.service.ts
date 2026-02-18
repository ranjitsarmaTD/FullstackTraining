import { AppDataSource } from "../dataSource";
import { User } from "../entity/User";
import { hash, compare }from "bcrypt";

const userRepo = AppDataSource.getRepository(User);

//required in HR admin side
export async function signupUser(
  email: string,
  password: string,
  name: string
) {
  const hashed = await hash(password, 10);

  const user = userRepo.create({
    email,
    password: hashed,
    name,
  });

  return userRepo.save(user);
}


//general login
export async function loginUser(
  email: string,
  password: string
) {
  const user = await userRepo.findOneBy({ email });
  if (!user) throw new Error("Invalid credentials");

  const valid = await compare(password, user.password);
  if (!valid) throw new Error("Invalid credentials");

  return user;
}
