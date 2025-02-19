
const data = [
  {
    id: "1",
    name: 'Product 1',
    description: 'This is a product description',
    url: "https://www.youtube.com/embed/6F0UxYE_HK0?si=BF1j6mGmnGe7NbJd"
  },
  {
    id: "2",
    name: 'Product 2',
    description: 'This is a product description',
    url: "https://www.youtube.com/embed/vwSlYG7hFk0?si=4QWBHkj_fjpcoKc9",
  },
  {
    id: "3",
    name: 'Product 3',
    description: 'This is a product description',
    url: "https://www.youtube.com/embed/hn80mWvP-9g?si=iLQzdi4zDinr9vux"
  },
  {
    id: "4",
    name: 'Product 4',
    description: 'This is a product description',
    url: "https://www.youtube.com/embed/EW1gb1EHd6A?si=yHx9mGoi1alMXeij"
  },
  {
    id:
      "5",
    name: 'Product 5',
    description: 'This is a product description',
    url: "https://www.youtube.com/embed/Q2tX2v7KXhk?si=byV56IvnG493ynxv"
  }
]
export async function GET(req: Request) {
  return Response.json({ data });
}

export async function POST(req: Request) {
  const {id} = await req.json();
  const item = data.filter(product => product.id === id);
  return Response.json(item[0] || {});
}