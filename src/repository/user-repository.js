import CrudRepository from "./crud-repository.js";
import User from "../models/user.js";
class UserRepository extends CrudRepository{
    constructor(){
        super(User);
    }

    async getByEmail(userEmail){
        try {
            const user = await User.findOne({
                where:{
                    email :userEmail
                }
            })
            console.log("user", user);
            return user;
        } catch (error) {
            console.log("something went wrong in repo", error);            
        }
    }
}

export default UserRepository;