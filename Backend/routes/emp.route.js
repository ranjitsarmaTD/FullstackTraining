import express from 'express'
import { addEmp, deleteEmp, getAllEmp, getEmpById, updateEmpById } from '../controllers/emp.controller.js';

const empRouter = express.Router();

empRouter.get('/', getAllEmp);
empRouter.post('/add', addEmp);
empRouter.put('/:id', updateEmpById)
empRouter.get('/:id', getEmpById)
empRouter.delete('/:id', deleteEmp)

export default empRouter;