const mongoose = require('mongoose');

//schema for blacklisting jwt token when logout 
const blacklistTokenSchema = new mongoose.Schema({
    token:{
        type:String,
        required: true,
        unique:true
    },
    createdAr:{
        type:Date,
        default:Date.now,
        expires:86400   //24 hours in seconds
    }
})

const blacklistModel = mongoose.model('blacklistToken',blacklistTokenSchema);

module.exports=blacklistModel;