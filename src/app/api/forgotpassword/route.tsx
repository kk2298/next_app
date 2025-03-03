import { connect } from "../../(backend)/dbconfig/dbconfig";
import { sendMail } from "../../components/mailer";
import User from "../../(backend)/models/userModel";
import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/app/(backend)/db";

export async function POST(request : NextRequest){
    await dbConnect();
    try {
        const reqBody = await request.json();
        const {email} = reqBody;
        const user = await User.findOne({email})
        if(!user){
            return NextResponse.json({error : "No Such users exist"}, {status : 404})
        }
        
        await sendMail({email, emailType : "RESET", userId : user._id})

        return NextResponse.json(
            {
                message : "Password recovery email sent Successfully",
                success : true
            }
        )
    } catch (error:any) {
        console.log(error)
        return NextResponse.json({error : error.message}, {status : 500})
    }
}