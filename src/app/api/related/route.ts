import { data } from '../dummy/route';

export async function POST(req: Request) {
  const { id, tags } = await req.json();

  const relatedProducts = data.filter((product: any) => 
    product.id !== id && 
    product.tags.some((tag: any) => tags.includes(tag))
  );

  return Response.json({ data: relatedProducts.slice(0,3) });
}