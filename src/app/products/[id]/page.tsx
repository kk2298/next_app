type Props = {}

import { Metadata } from "next"
import Video from "./Video";
import Link from "next/link";
import Head from "next/head";

// export const metadata: Metadata = {
//   title: "Product 1", 
//   description: "This is a product description"
// };

const port = 3000;
export async function generateMetadata({params}: any){
  const { id } =   await params;
  const response = await fetch(`http://localhost:${process.env.PORT}/api/dummy`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({id}),
  });
  const product = await response.json();
  return {
    title: product?.name || "product",
    description: product?.description || "Product desc"
  }
}


const Page = async ({params}: any) => {
    const {id} = await params;

    const response = await fetch(`http://localhost:${process.env.PORT}/api/dummy`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({id}),
    });
    const result = await response.json();
  return (
    <>
      <Head>
        <title>{result.name}</title>
        <meta property="og:title" content={`${result.name}`} />
        <meta property="og:description" content={`${result.description}`} />
      </Head>
     <div className="bg-neutral-100 p-4 absolute">
      <Link href="/products" className=" p-2 rounded-lg underline font-medium  hover:text-gray-500">
      Go Back
      </Link>
     </div>
     <h1 className="text-neutral-100 bg-neutral-100">{result.name}</h1>
    <Video  product={result}/>
    </>
  )
}

export default Page