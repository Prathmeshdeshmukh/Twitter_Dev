import CrudRepository from "./crud-repository.js";
import User from "../models/user.js";
class UserRepository extends CrudRepository{
    constructor(){
        super(User);
    }

    async findBy(data){
        try {
            const user = await User.findOne(data);
            console.log("user", user);
            return user;
        } catch (error) {
            console.log("something went wrong in repo", error);            
        }
    }
}

export default UserRepository;