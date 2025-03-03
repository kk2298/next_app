import Product from "@/app/(backend)/models/productModal";


export async function GET(){
    const products = await Product.find({});
    return Response.json({data: products});
}