import Product from "@/app/(backend)/models/productModal";


export async function POST(req: Request){
    try {
        const formData = await req.formData();
        let {_id,product_id, name, video_title, description, image, video_url, keywords, tags } : any = Object.fromEntries(formData);
        keywords = JSON.parse(keywords);
        const file = image;
        let base64String = '';
        let mimeType = "";
        if (file instanceof File) {
            mimeType = file.type;
            const arrayBuffer = await file.arrayBuffer();
            base64String = btoa(
                new Uint8Array(arrayBuffer)
                    .reduce((data, byte) => data + String.fromCharCode(byte), '')
            );
            image =  `data:${mimeType};base64,${base64String}`;
        }
        const updatedProduct = await Product.findOneAndUpdate({_id}, {name, video_title,product_id, description, image, video_url, keywords, tags});
        if(!updatedProduct){
            return Response.json({error: true, message: 'Failed to update product'});
        }
    
        return Response.json({error: false, message: 'Product updated successfully'});
    } catch (error) {
        console.log(error);
        return Response.json({error: true, message: 'Failed to update product'});
    }
}