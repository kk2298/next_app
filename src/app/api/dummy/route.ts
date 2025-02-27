import { data } from '../../components/data'; 
export async function GET() {
  return Response.json({ data });
}
 
export async function POST(req: Request) {
  let {id} = await req.json();
  const item = data.filter(product => product.id === id);
  return Response.json(item[0] || {});
}





