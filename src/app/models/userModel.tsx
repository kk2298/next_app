import mongoose from "mongoose";

const userSchema =new mongoose.Schema(
    { username:
        {
            type:String,
            require: true        
        },
      email:
      {
        type:String,
        unique:true,
        require: true
      },
      password:
      {
        type:String,
        require: true
      },
        role:
        {
            type:String,
            default:"user",
        },
        
       forgotPasswordToken:String,
       forgotPasswordTokenExpiry:Date,
       verfiyToken:String,
       verifyTokenExpiry: Date, 
              

    },{timestamps: true}
)
const User =mongoose.models.users||mongoose.model('users',userSchema);

export default User;