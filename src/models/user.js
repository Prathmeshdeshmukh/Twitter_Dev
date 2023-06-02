import mongoose from "mongoose";
import bcrypt from 'bcrypt';
const userSchema = new mongoose.Schema({
    username : {
        type: String,
        required : true,
        unique: true
    },
    email : {
        type : String,
        required: true,
        unique: true
    },
    password : {
        type : String,
        required: true
    }
}, {timestamps: true})

userSchema.pre('save', function next(){
    const user = this;
    const SALT = bcrypt.genSaltSync(10);
    const encryptedPassword = bcrypt.hashSync(user.password, SALT);
    user.password = encryptedPassword;
})

const User = mongoose.model('User', userSchema);

export default User;