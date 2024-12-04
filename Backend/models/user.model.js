const mongoose=require("mongoose");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const userSchema = new mongoose.Schema({
    fullname:{
        firstname:{
            type:String,
            required:true,
            minlength: [3,'First name must be at least 3 characters long']
        },
        lastname:{
            type:String,
            minlength: [3,'Last name must be at least 3 characters long']
        },
    },
    email:{
        type:String,
        required: true,
        unique: true,
        minLength: [5,'Email must be at lest 5 character long'],
    },
    password:{
        type:String,
        required:true,
        //so that when user is searched its password dont get send
        //this avoids sending of password when user is searched using email or whatsoever
        select:false,
    },
    //Use to Share live location to  the driver
    socketId:{
        type:String,
    }
})

userSchema.methods.generateAuthToken = function () {
    const token = jwt.sign({_id:this._id},process.env.JWT_SECRET,{expiresIn:'24h'})
    return token;
}

userSchema.methods.comparePassword = async function (password){
    return await bcrypt.compare(password, this.password);
}

userSchema.statics.hashPassword = async function (password) {
    return bcrypt.hash(password,10);
}

const userModel = mongoose.model('user',userSchema);

module.exports=userModel;