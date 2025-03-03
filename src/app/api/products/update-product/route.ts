import Product from "@/app/(backend)/models/productModal";


export async function POST(req: Request){
    try {
        const formData = await req.formData();
        let {_id, name, video_title, description, image, video_url, keywords, tags } : any = Object.fromEntries(formData);
        keywords = JSON.parse(keywords);
        const file = image;
        let base64String = '';
        if (file instanceof File) {
            const arrayBuffer = await file.arrayBuffer();
            base64String = btoa(
                new Uint8Array(arrayBuffer)
                    .reduce((data, byte) => data + String.fromCharCode(byte), '')
            );
        }
        const updatedProduct = await Product.findOneAndUpdate({_id}, {name, video_title, description, image: base64String, video_url, keywords, tags});
        if(!updatedProduct){
            return Response.json({error: true, message: 'Failed to update product'});
        }
    
        return Response.json({error: false, message: 'Product updated successfully'});
    } catch (error) {
        console.log(error);
        return Response.json({error: true, message: 'Failed to update product'});
    }
}