import { connect } from "../../(backend)/dbconfig/dbconfig";
import User from "../../(backend)/models/userModel";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";

connect();

export async function POST(request: NextRequest){
    try {
        const reqBody = await request.json();
        const { newPassword, token } = reqBody;
        const user = await User.findOne({forgotPasswordToken : token, forgotPasswordTokenExpiry : {$gt : Date.now()}})

        if(!user){
            return NextResponse.json({error : "No such Users"}, {status : 404})
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(newPassword, salt);

        user.password = hashedPassword;
        user.forgotPasswordToken = undefined;
        user.forgotPasswordExpiry = undefined;

        await user.save();             

        return NextResponse.json({message : "Password reset successfully"}, {status : 200})

    } catch (error : any) {
        console.log(error.message)
        return NextResponse.json({message : "Internal server error"}, {status : 500})
    }
}