import { UserRepository } from '../repository/index.js';
// import bcrypt from 'bcrypt';

class UserService {
    constructor() {
        this.userRepository = new UserRepository();
    }

    async signup(data) {
        try {
            const user = await this.userRepository.create(data);
            const { password, ...othersData } = user._doc;
            return othersData;
        } catch (error) {
            console.log("Something went wrong in service layer", error);
        }
    }

    async getByID(userId) {
        try {
            const user = await this.userRepository.get(userId);
            return user;
        } catch (error) {
            console.log("Something went wrong in service layer", error);
        }
    }

    async getByEmail(email) {
        try {
            const user = await this.userRepository.findBy({ email });
            return user;
        } catch (error) {
            console.log("something went wrong in service layer", error)

        }
    }

    async signin(data) {
        try {
            const user = await this.getByEmail(data.email);
            if (!user) {
                throw {
                    message: 'no user found'
                }
            }
            if (!user.comparePassword(data.password)) {
                throw {
                    message: 'incorrect password'
                }
            }

            const token = user.genJWT();
            return token;


        } catch (error) {
            console.log("something went wrong in service layer", error)
        }
    }

    async update(userId, data) {
        try {
            const user = await this.userRepository.update(userId, data);
            return user;
        } catch (error) {
            console.log("something went wrong in service layer", error);
        }
    }

    async delete(userId) {
        try {
            const response = await this.userRepository.destroy(userId);
            return response;
        } catch (error) {
            console.log("something went wrong in service layer", error);
        }
    }
}

export default UserService;