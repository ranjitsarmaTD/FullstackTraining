import User from "../entities/user.js"
import { AppDataSource } from "../utility/db.js"

const empRepository = AppDataSource.getRepository(User)

export const getAllEmp = async (req, res) => {
    try {
        let emp = await empRepository.find();
        emp = emp.map((item) => {
            item.password = undefined;
            return item;
        }) 
        return res.status(200).json({
            success: true,
            message: "Data Fetched",
            emp
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        })
    }
}

export const addEmp = async (req, res) => {
    const {name, salary, dept, role, email, password} = req.body;
    if(!name || !salary || !dept || !role || !email || !password){
        return res.status(400).json({
            success: false,
            message: "All fields are required"
        })
    }
    try {
        const response = await empRepository.create({name, salary, dept, role, email, password});
        await empRepository.save(response);
        console.log(response);
        return res.status(201).json({
            success: true,
            message: "employee added",
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        })
    }
}

export const updateEmpById = async (req, res) => {
    const {id} = req.params;
    const {name, role, salary, email, password, dept} = req.body;
    if(!id){
        return res.status(400).json({
            success: false,
            message: "Missing employee id"
        })
    }
    const emp = await empRepository.findOneBy({id});
    if(!emp){
        return res.status(404).json({
            success: false,
            message: 'Invalid Id'
        })
    }
    const updatedEmp = await empRepository.update(
        id,
        {
            name,
            dept,
            email,
            password,
            salary,
            role
        }
    )

    return res.status(200).json({
        success: true,
        message: 'Updated',
        updatedEmp
    })
}

export const getEmpById = async (req, res) => {
    const {id} = req.params;
    if(!id){
        return res.status(400).json({
            success: false,
            message: "Missing Id"
        })
    }
    try {
        const emp = await empRepository.findOneBy({id});
        if(!emp){
            return res.status(404).json({
                success: false,
                message: 'Invalid Id'
            })
        }
        return res.status(200).json({
            message: 'Employee found',
            success: true,
            emp
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "failed to find employee"
        })
    }
}

export const deleteEmp = async (req, res) => {
    const {id} = req.params;
    if(!id){
        return res.status(400).json({
            success: false,
            message: "Missing Id"
        })
    }
    try {
        const emp = await empRepository.findOneBy({id});
        if(!emp){
            return res.status(404).json({
                success: false,
                message: 'Invalid Id'
            })
        }
        const deletedEmp = await empRepository.delete(id);
        return res.status(200).json({
            success: true,
            message: "Employee Deleted"
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "failed to find employee"
        })
    }

}