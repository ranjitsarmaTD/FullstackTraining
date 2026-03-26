import { Request, Response, NextFunction } from "express";
import { verify } from "jsonwebtoken";
import { User } from "../entity/User";
import { AppDataSource } from "../dataSource";

interface userPayload {
  id: string;
  role: "admin" | "employee" | "hr";
  //   employeeId: string;
  //   name: string;
  //   email: string;
}

export async function authenticate(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  const token = req.cookies?.token;
  // console.log("Token from browser",token)

  if (!token) {
    return res.status(401).json({ message: "Not authenticated" });
  }
 
  try {
    //decode has id and role
    const decoded = verify(token, process.env.JWT_SECRET!) as userPayload;
    // console.log("Decoded",decoded)
    const userRepo = AppDataSource.getRepository(User);
    //user has the entity user.
    const user = await userRepo.findOneBy({ id: decoded.id });
    if (!user) {
      return res.status(401).json({ message: "User not found" });
    }
    //combined data
    // req.user = { ...decoded, ...user };
    console.log("authenticate middleware user retrieved is:" ,user.name)

    req.user = {
      userId: user.id,
      employeeId: user.employeeId,
      name: user.name,
      email: user.email,
      role: user.role,
    };

    next();
  } catch (error) {
    res.status(401).json({ message: "Invalid token" });
  }
}
