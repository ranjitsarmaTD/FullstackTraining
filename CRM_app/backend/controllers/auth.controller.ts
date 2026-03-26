import { Request, Response } from "express";
import { loginUser, signupUser } from "../services/auth.service";
import { signToken } from "../utils/jwt";
// import { AuthRequest } from "../types/auth";

export async function signUp(req: Request, res: Response) {
  
  const { role, employeeId, password, email, name , dob, joiningDate, location } = req.body;

  try {
    const user = await signupUser(employeeId, email, password, name, role, dob, joiningDate, location);
    if (!employeeId || !email || !password || !name || !role || !dob || !joiningDate || !location) {
      return res.status(400).json({
        message: "Missing required fields",
      });
    }
    res.status(201).json({
      message: "User created successfully",
      userId: user.id,
      employeeId: user.employeeId,
    });
  } catch (error: any) {
    console.log("Issue with user signUp", error);
    return res.status(500).json({
      message: "Failed to create user",
      error: error.message,
    });
  }
}

export async function login(req: Request, res: Response) {
  const { role, employeeId, password } = req.body;

  try {
    console.log("In Login controller");
    const user = await loginUser(role, employeeId, password);

    console.log("User found after service--next going to token:", user);

    const token = signToken(user.id, user.role); //not employee id, this id will be uniquely generated id at first registration
    console.log("Token generated:", token);
    res.cookie("token", token, {
      httpOnly: true,
      sameSite: "strict",
      secure: false, // true in production
      path: "/"
    });

    res.json({
      sucess: true,
      message: "Login successful",
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error: any) {
    res
      .status(401)
      .json({ sucess: false, message: error.message || "Login failed" });
  }
}

export async function logout(req: Request, res: Response) {
  res.clearCookie("token", {
    httpOnly: true,
    secure: false,
    sameSite: "strict",
    path: "/"
  });
  console.log("Logged out",req.cookies)
  return res.status(200).json({ message: "Logged out successfully" });
}

export function me(req: Request, res: Response) {
  if (!req.user) {
    return res.status(401).json({ authenticated: false });
  }

  // From here, TypeScript knows req.user exists
  res.json({
    authenticated: true,
    user: {
      userId: req.user.userId,
      employeeId: req.user.employeeId,
      name: req.user.name,
      email: req.user.email,
      role: req.user.role,
    },
  });
}
