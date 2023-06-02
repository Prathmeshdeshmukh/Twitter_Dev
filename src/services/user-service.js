import { UserRepository } from '../repository/index.js';
import bcrypt from 'bcrypt';

class UserService{
    constructor(){
        this.userRepository = new UserRepository();
    }

    async signup(data){
        try {
            const user = await this.userRepository.create(data);
            return user;
        } catch (error) {
            console.log("Something went wrong in service layer",error);
        }
    }

    async getByID(userId){
        try {
            const user = await this.userRepository.get(userId);
            return user;
        } catch (error) {
            console.log("Something went wrong in service layer",error);
        }
    }

    async signIn(userEmail , userPassword){
        try {
            const user = await this.userRepository.getByEmail(userEmail);
            console.log(user.password);
            const match = bcrypt.compareSync(userPassword, user.password);
            if(!match){
                console.log('Password doesnt match');
                throw {error : 'Incorrect Password'}
            }
            return user;
        } catch (error) {
            console.log("something went wrong in service layer", error)
            
        }
    }

}

export default UserService;