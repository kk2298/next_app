
import { data } from '../dummy/route';

export async function GET(req: Request){
    const { searchParams } = new URL(req.url);
  const text = searchParams.get('search') || ""; 
    const result = data.filter(product => {
        const regex = new RegExp(text, 'i');
        return regex.test(product.name);
    })
    return Response.json({
        data: result
    })
}