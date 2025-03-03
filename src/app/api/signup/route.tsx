import dbconnect from "../../(backend)/db";
import User from "../../(backend)/models/userModel";
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";


dbconnect()


export async function POST(request: NextRequest){
    try {
        const reqBody = await request.json()
        const {username, email, password} = reqBody

        console.log(reqBody);

        //check if user already exists
        const user = await User.findOne({email})

        if(user){
            return NextResponse.json({error: "User already exists"}, {status: 400})
        }

        //hash password
        const salt = await bcryptjs.genSalt(10)
        const hashedPassword = await bcryptjs.hash(password, salt)

        const newUser = new User({
            username,
            email,
            password: hashedPassword
        })

        const savedUser = await newUser.save()
        console.log(savedUser);

        //create token data
                const tokenData = {
                    id: savedUser._id,
                    username: savedUser.username,
                    email: savedUser.email
                }
                //create token
                const token = await jwt.sign(tokenData, process.env.TOKEN_SECRET!, {expiresIn: "1d"})
        
                const response = NextResponse.json({
                    message: "Login successful",
                    success: true,
                })
                response.cookies.set("token", token, {
                    httpOnly: false, 
                    
                })
                return response;
        
        


    } catch (error: any) {
        return NextResponse.json({error: error.message}, {status: 500})

    }
}