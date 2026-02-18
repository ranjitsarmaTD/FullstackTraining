import express from 'express';
import { addDept, deleteDept, getAllDept, getDeptById, updateDept } from '../controllers/dept.controller.js';

const deptRouter = express.Router();

deptRouter.post('/add-dept', addDept);
deptRouter.get('/', getAllDept);
deptRouter.get('/:id', getDeptById);
deptRouter.put('/:id', updateDept);
deptRouter.delete('/:id', deleteDept);

export default deptRouter;