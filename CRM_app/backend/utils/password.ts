import {compare,hash} from "bcrypt";

export const comparePassword = (
  plain: string,
  hash: string
) => compare(plain, hash);


export const hashPassword = (password: string) => hash(password, 10);