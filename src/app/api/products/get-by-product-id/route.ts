import dbConnect from "@/app/(backend)/db";
import Product from "@/app/(backend)/models/productModal";


export async function POST(req: Request){
    const {product_id} = await req.json();
    await dbConnect();
    try {
        const product = await Product.findOne({product_id});
        return Response.json({error: false, data: product || {}});
    } catch (error) {
        return Response.json({error: true, message: 'An error occured'});
    }
}