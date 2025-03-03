import dbConnect from "@/app/(backend)/db";
import Product from "@/app/(backend)/models/productModal";


export async function GET(){
    await dbConnect();
    const products = await Product.find({});
    return Response.json({data: products});
}