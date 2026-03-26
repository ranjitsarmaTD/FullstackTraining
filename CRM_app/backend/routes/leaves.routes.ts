import { Router } from "express";
import { applyLeaveFunction, approveLeaveController, getAllLeavesFunction, getLeaveCountFunction, getLeavesFunction, rejectLeaveController } from "../controllers/leaves.controller";
import { authenticate } from "../middlewares/authenticate";
import { roleCheck } from "../middlewares/roleCheck";


const router = Router()

router.post("/apply-leave",authenticate,applyLeaveFunction)
router.get("/get-leaves",authenticate,getLeavesFunction)
router.get("/leave-count",authenticate,getLeaveCountFunction);


router.get("/all-leaves",authenticate,roleCheck("hr"),getAllLeavesFunction)
router.patch("/:leaveId/approve",authenticate,roleCheck("hr"),approveLeaveController)
router.patch("/:leaveId/reject",authenticate,roleCheck("hr"),rejectLeaveController)


export default router