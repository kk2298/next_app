import { getDataFromToken } from "../../components/getDataToken";

import { NextRequest, NextResponse } from "next/server";
import User from "../../(backend)/models/userModel";
import { connect } from "../../(backend)/dbconfig/dbconfig";

connect();

export async function GET(request:NextRequest){

    try {
        const userId = await getDataFromToken(request);
        const user = await User.findOne({_id: userId})
        console.log(user);
         return NextResponse.json({
            mesaaage: "User found",
            data: user
        })
        
    } catch (error:any) {
        return NextResponse.json({error: error.message}, {status: 400});
    }

}