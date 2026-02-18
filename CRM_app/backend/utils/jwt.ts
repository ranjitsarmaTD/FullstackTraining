import {sign,verify} from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET!;//TO be placed in an env config

export const signToken = (userId: string) => {
  return sign({ userId }, JWT_SECRET, {
    expiresIn: "1d",
  });
};

export const verifyToken = (token: string) => {
  return verify(token, JWT_SECRET);
};
