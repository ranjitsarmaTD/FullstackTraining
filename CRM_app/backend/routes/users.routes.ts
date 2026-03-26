
import { Router } from "express";
import { authenticate } from "../middlewares/authenticate";
import { roleCheck } from "../middlewares/roleCheck";
import { fetchUserProfile,fetchAllEmployees, deleteEmployeeFunction } from "../controllers/users.controller";

const router = Router();

router.get("/profile",authenticate,fetchUserProfile)
router.get("/all-employees",authenticate,fetchAllEmployees)
router.delete("/delete/:id",authenticate,roleCheck("hr"),deleteEmployeeFunction)


export default router;