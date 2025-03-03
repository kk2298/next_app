import dbConnect from "@/app/(backend)/db";
import Product from "@/app/(backend)/models/productModal";

export async function POST(req: Request){
    await dbConnect();
    try {
        const formData = await req.formData();
        const data = Object.fromEntries(formData.entries());
        let { name, video_title,product_id, description, image, video_url, tags,keywords, updated_by, created_by }: any = data;
        console.log('product_id', product_id);
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
            image = `data:${mimeType};base64,${base64String}`;
           
        }
        const newProduct = await Product.create({
            name,
            video_title,
            description,
            image,
            video_url,
            product_id,
            tags,
            keywords,
            updated_by,
            created_by
        })
        if(!newProduct){
            return Response.json({ error: true, message: 'Failed to create product'});
        }
        return Response.json({ error: false, message: 'Product created successfully'});
    } catch (error) {
        console.log('Error creating product: ', error);
        return Response.json({ error: true, message: 'Failed to create product'});
    }
}