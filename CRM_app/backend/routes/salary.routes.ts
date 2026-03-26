import { Router } from "express";
import { authenticate } from "../middlewares/authenticate";
import { addSalaryController, getAllSalariesController, getMySalaryController} from "../controllers/salary.controller";
import { roleCheck } from "../middlewares/roleCheck";



const router = Router()

router.get("/my-salary",authenticate,getMySalaryController)



router.post("/add-salary",authenticate,roleCheck("hr"),addSalaryController)
router.post("/all-salaries",authenticate,roleCheck("hr"),getAllSalariesController)


export default router;