import { Request, Response } from "express";
import { loginUser } from "../services/auth.service";
import { signToken } from "../utils/jwt";

export async function login(req: Request, res: Response) {
  const { email, password } = req.body;

  try {
    const user = await loginUser(email, password);

    const token = signToken(user.id);

    res.cookie("token", token, {
      httpOnly: true,
      sameSite: "strict",
      secure: false, // true in production
    });

    res.json({
      message: "Login successful",
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
      },
    });
  } catch {
    res.status(401).json({ message: "Invalid email or password" });
  }
}
