import {sign,verify} from "jsonwebtoken";


export const signToken = (id: string,role:"hr"|"admin"|"employee") => {
const JWT_SECRET = process.env.JWT_SECRET!;

  return sign({ id,role }, JWT_SECRET, {
    expiresIn: "30m",
  });
};

export const verifyToken = (token: string) => {
const JWT_SECRET = process.env.JWT_SECRET!;

  return verify(token, JWT_SECRET);
};
