import mongoose from "mongoose";
import bcrypt from 'bcrypt';
import jwt from "jsonwebtoken";
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
    },
    profilePicture :{
        type : String
    },
    followers:{
        type : Array,
        default : []
    },
    following:{
        type : Array,
        default : []
    },
    description : {
        type : String
    },
    profilePicture:{
        type: String
    }
}, {timestamps: true})

userSchema.pre('save', function next(){
    const user = this;
    const SALT = bcrypt.genSaltSync(10);
    const encryptedPassword = bcrypt.hashSync(user.password, SALT);
    user.password = encryptedPassword;
})

userSchema.methods.comparePassword = function compare(password) {
    return bcrypt.compareSync(password, this.password);
}

userSchema.methods.genJWT = function generate() {
    return jwt.sign({id: this._id, email: this.email}, 'twitter_secret', {
        expiresIn: '1h'
    });
}

const User = mongoose.model('User', userSchema);

export default User;