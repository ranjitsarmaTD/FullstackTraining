import User from "../entities/user.js";
import { AppDataSource } from "../utility/db.js";
import jwt from 'jsonwebtoken'

const userRepository = AppDataSource.getRepository(User);
const login = async (req, res) => {
    // console.log("hit in controller")
    try {
        const {email, password} = req.body;
        if(!email || !password){
            return res.status(401).json({
                success: false,
                message: "Please provide email and password"
            })
        }
        const user = await userRepository.findOneBy({email});
        if(!user){
            return res.status(404).json({
                success: false,
                message: "User Not Found"
            })
        }
        if(password != user.password){
            return res.status(401).json({
                success: false,
                message: "Incorrect Password"
            })
        }
        user.password = undefined;
        const token = jwt.sign({id: user.id}, process.env.JWT_SECRET,
            {expiresIn: '2h'}
        )
        return res.status(200).json({
            message: "User Found",
            success: true,
            user,
            token
        });
    } catch (error) {
        console.log(error.message);
        return res.status(500).json({
            success: false,
            message: error.message
        })
    }
}

const verifyUser = async (req, res) => {
    // console.log('hittt');
    const token = (req.headers.authorization).split(' ')[1];
    // console.log('token is== ', token);
    if(!token){
        return res.status(404).json({
            success: false,
            message: "Missing Token"
        })
    }
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
    if(!decodedToken){
        return res.status(404).json({
            success: false,
            message: "Invalid Token"
        })
    }
    const user = await userRepository.findOneBy({id: decodedToken.id});
    if(!user){
        return res.status(404).json({
            success: false,
            message: "User Not Found"
        })
    }
    user.password = undefined
    return res.status(200).json({
        success: true,
        message: "User Found",
        user
    })
}

export {login, verifyUser};