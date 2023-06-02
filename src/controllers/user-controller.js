import UserService from "../services/user-service.js";
const userService = new UserService();


export const signUp = async(req, res)=>{
    try {
        const response = await userService.signup({
            email : req.body.email,
            password : req.body.password,
            username : req.body.username
        });
        return res.status(201).json({
            data: response,
            message : 'successfuly signed Up new user',
            err: {},
            success: true,
            
        })
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            message : 'something went wrong in controller',
            err: error,
            success: false,
            data:{}
        })
    }
}

export const getUser = async(req, res) =>{
    try {
        const user = await userService.getByID(req.params.id);
        return res.status(200).json({
            data: user,
            message : 'successfuly fetched a user',
            err: {},
            success: true,
        })
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            message : 'something went wrong in controller',
            err: error,
            success: false,
            data:{}
        })
        
    }
}

export const signInByEmail = async(req, res) =>{
    try {
        const user = await userService.signIn(req.params.email, req.params.password);
        return res.status(200).json({
            data: user,
            message : 'successfuly logged in a user',
            err: {},
            success: true,
        })
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            message : 'something went wrong in controller',
            err: error,
            success: false,
            data:{}
        })
        
    }
}