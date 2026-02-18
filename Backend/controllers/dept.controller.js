import Dept from "../entities/dept.js";
import { AppDataSource } from "../utility/db.js";
import jwt from 'jsonwebtoken';

const deptRepository = AppDataSource.getRepository(Dept)
const addDept = async (req, res) => {
    try {
        const {dept_name, dept_description} = req.body;
        console.log(dept_name, dept_description);
        const newDept = deptRepository.create({name: dept_name, description: dept_description});
        await deptRepository.save(newDept);
        return res.status(201).json({
            success: true,
            message: "Dept added"
        })
    } catch (error) {
        console.log(error.message);
        return res.status(500).json({
            success: false,
            message: error.message
        });
    }
}

const getAllDept = async (req, res) => {
    const token = req.headers.authorization.split(' ')[1];
    if(!token){
        return res.status(401).json({
            success: false,
            message: "session expired please login again"
        })
    }
    const verifyToken = jwt.verify(token, process.env.JWT_SECRET);
    // console.log(verifyToken);
    if(!verifyToken){
        return res.status(401).json({
            success: false,
            message: "session expired please login again"
        })
    }
    try {
        const dept = await deptRepository.find();
        return res.status(200).json({
            success: true,
            message: "Successfully Fetched Departments",
            dept
        })        
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        })
    }
}

const getDeptById = async (req, res) => {
    // console.log("hit");
    try {
        const {id} = req.params;
        // console.log(id);
        if(!id){
            return res.status(404).json({
                success: false,
                message: "Invalid Id"
            })
        }
        const dept = await deptRepository.findOneBy({id});
        return res.status(200).json({
            success: true,
            message: "Department found",
            dept
        })
    } catch (error) {
        return res.status(500).json({
            message: error.message,
            success: false
        })
    }
}

const updateDept = async (req, res) => {
    const {id} = req.params;
    const {DeptDesc, DeptName} = req.body;
    // console.log(DeptName);
    try {
        if(!id){
            return res.status(404).json({
                success: false,
                message: "Invalid Id"
            })
        }
        const dept = await deptRepository.findOneBy({id});
        if(!dept){
            return res.status(404).json({
                success: false,
                message: 'Invalid Id'
            })
        }
        const updatedDept = await deptRepository.update(
            id,
            {
                name: DeptName,
                description: DeptDesc
        })
        console.log(updatedDept);
        return res.status(200).json({
            success : true,
            message: "Department Updated"
        })
    } catch (error) {
        return res.status(500).json({
            message: error.message,
            success: false
        })
    }
}

const deleteDept = async (req, res) => {
    const {id} = req.params;
    if(!id){
        return res.status(404).json({
            success: false,
            message: 'Invalid Id'
        })
    }
    const dept = await deptRepository.delete({id});
    if(!dept){
        return res.status(404).json({
            success: false,
            message: 'Department Not Found'
        })
    }
    return res.status(200).json({
        success: true,
        message: 'Department delete'
    });
}

export {addDept, getAllDept, getDeptById, updateDept, deleteDept};