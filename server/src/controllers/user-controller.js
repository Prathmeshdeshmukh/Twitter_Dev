import UserService from "../services/user-service.js";
const userService = new UserService();
import User from "../models/user.js";


export const signUp = async (req, res) => {
    try {
        const response = await userService.signup({
            email: req.body.email,
            password: req.body.password,
            username: req.body.username
        });
        return res.status(201).json({
            data: response,
            message: 'successfuly signed Up new user',
            err: {},
            success: true,

        })
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            message: 'something went wrong in controller',
            err: error,
            success: false,
            data: {}
        })
    }
}

export const getUser = async (req, res) => {
    try {
        const user = await userService.getByID(req.params.id);
        return res.status(200).json(user);
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            message: 'something went wrong in controller',
            err: error,
            success: false,
            data: {}
        })

    }
}

export const login = async (req, res) => {
    try {
        const token = await userService.signin(req.body);
        // console.log(token);
        const user = await userService.getByEmail(req.body.email);
        const { password, ...othersData } = user._doc;
        return res.cookie('access-token', token, { httpOnly: true }).status(200).json(othersData);
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            message: 'something went wrong in controller',
            err: error,
            success: false,
            data: {}
        })

    }
}

export const updateUser = async (req, res) => {
        try {
            const updatedUser = await User.findByIdAndUpdate(
                req.params.id,
                {
                    $set: req.body,
                },
                {
                    new: true,
                }
            );
            return res.status(200).json(updatedUser);

        } catch (error) {
            console.log("err", error);
            return res.status(500).json({
                message: 'something went wrong in controller',
                err: error,
                success: false,
                data: {}
            })

        }
    }


export const deleteUser = async (req, res) => {
    try {
        const response = await userService.delete(req.query.id);
        console.log(response)
        return res.status(200).json({
            data: response,
            message: 'successfuly deleted a user',
            err: {},
            success: true,
        })
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            message: 'something went wrong in controller',
            err: error,
            success: false,
            data: {}
        })

    }
}

export const followUser = async (req, res) => {
    try {
        var user = await User.findById(req.params.id);
        console.log(user)
        var currentUser = await User.findById(req.body.id);
        console.log(currentUser)
        console.log(user);
        if (!user.followers.includes(req.body.id)) {
            await user.updateOne({
                $push: {
                    followers: req.body.id
                }
            })
            await currentUser.updateOne({
                $push: {
                    following: req.params.id
                }
            });
        }
        else {
            return res.status(403).json('you already follow this user');
        }
        return res.status(200).json({
            data: true,
            message: 'successfuly followed a user',
            err: {},
            success: true,
        })
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            message: 'something went wrong in controller',
            err: error,
            success: false,
            data: {}
        })
    }


}

export const unFollowUser = async (req, res) => {
    try {
        var user = await User.findById(req.params.id);
        var currentUser = await User.findById(req.body.id);
        console.log(user);
        if (currentUser.following.includes(req.params.id)) {
            await user.updateOne({
                $pull: {
                    followers: req.body.id
                }
            })
            await currentUser.updateOne({
                $pull: {
                    following: req.params.id
                }
            });
        }
        else {
            return res.status(403).json('you are not following this user');
        }
        return res.status(200).json({
            data: true,
            message: 'successfuly unfollowed a user',
            err: {},
            success: true,
        })
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            message: 'something went wrong in controller',
            err: error,
            success: false,
            data: {}
        })
    }
}