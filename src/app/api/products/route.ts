import { data } from '../dummy/route';

export async function POST(req: Request){
    const {offset, limit} = await req.json();
    const products = data.slice(offset, offset + limit);
    return Response.json({data: products});
}