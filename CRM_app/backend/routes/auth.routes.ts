import { Router } from "express";
import { login,logout,signUp } from "../controllers/auth.controller";
import { authenticate } from "../middlewares/authenticate";
import {me} from "../controllers/auth.controller"
import { roleCheck } from "../middlewares/roleCheck";
const router = Router();

//HR only
router.post('/register',authenticate,signUp)//addrole check later


router.post("/login", login)
router.post("/logout", logout)

router.get("/me", authenticate, me)

export default router;
