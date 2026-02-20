import {compare} from "bcrypt";

export const comparePassword = (
  plain: string,
  hash: string
) => compare(plain, hash);
