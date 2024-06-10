import mongoose from "mongoose";

const userSchema = mongoose.Schema({
    email:{
        type:String,
        required:true,
        unique: true
    },
    userName:{
       type:String,
       required:true,
    },
    password:{
        type:String,
        required:true,
    },
    confirmpassword:{
        type:String,
    },
   
    profilePic: {
        type: String,
        required: true
    }

})

export default mongoose.model("User", userSchema)
