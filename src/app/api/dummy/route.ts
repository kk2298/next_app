
export const data = [
  {
    id: "water-proofing",
    name: 'Waterproofing',
    description: 'This is a product description',
    url: "https://www.youtube.com/embed/6F0UxYE_HK0?si=BF1j6mGmnGe7NbJd",
    image: "https://ramcocements.in/cms/uploads/Super_Shield_Container_375x375_f8d4efef6c.jpg",
  },
  {
    id: "eco-plast",
    name: 'Eco Plast',
    description: 'This is a product description',
    url: "https://www.youtube.com/embed/vwSlYG7hFk0?si=4QWBHkj_fjpcoKc9",
     image: "https://5.imimg.com/data5/SELLER/Default/2023/10/357083476/WY/NJ/KM/141972565/ramco-eco-plast-self-curing-plaster-500x500.jpg"
  },
  {
    id: "block-fix",
    name: 'Block Fix',
    description: 'This is a product description',
    url: "https://www.youtube.com/embed/hn80mWvP-9g?si=iLQzdi4zDinr9vux",
     image: "https://ramcocements.in/cms/uploads/Ramco_Block_Fix_375px_6971b9f828.jpg"
  },
  {
    id: "cement",
    name: 'Cement',
    description: 'This is a product description',
    url: "https://www.youtube.com/embed/EW1gb1EHd6A?si=yHx9mGoi1alMXeij",
     image: "https://i0.wp.com/rajbuilding.solutions/wp-content/uploads/2023/09/RAMCO-PPC-HDPE-2.png?resize=300%2C300&ssl=1"
  },
  {
    id:
      "tile-fix",
    name: 'Tile Fix',
    description: 'This is a product description',
    url: "https://www.youtube.com/embed/Q2tX2v7KXhk?si=byV56IvnG493ynxv",
     image: "https://5.imimg.com/data5/SELLER/Default/2022/10/PC/TT/QJ/26149917/ramco-tile-fix-t6-250x250.jpeg"
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

