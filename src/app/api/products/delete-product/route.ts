import Product from "@/app/(backend)/models/productModal";



export async function DELETE(req: Request){
    const {_id} = await req.json();
    try {
        const deletedProduct = await Product.deleteOne({_id});
        if(!deletedProduct){
            return Response.json({error: true, message: 'Failed to delete product'});
        }
        return Response.json({error: false, message: 'Product deleted successfully'});
    } catch (error) {
        console.log(error);
        return Response.json({error: true, message: 'Failed to delete product'});
    }
}