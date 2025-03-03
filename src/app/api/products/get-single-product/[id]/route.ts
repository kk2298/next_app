import dbConnect from "@/app/(backend)/db";
import Product from "@/app/(backend)/models/productModal";

export async function GET({params}: any){
    const {id} =  params;
    await dbConnect();
    try {
        const product = await Product.findById(id);
        if (!product) {
            return Response.json({error: false, message: 'Product not found'});
        }
        return Response.json({error: false, product});
    } catch (error) {
        return Response.json({error: true, message: 'Error fetching product'});
    }
}