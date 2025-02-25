type Props = {}

import { Metadata } from "next"
import Video from "./Video";
import Link from "next/link";
import Head from "next/head";
import Breadcrumbs from '../../components/breadcrumbs'

// export const metadata: Metadata = {
//   title: "Product 1", 
//   description: "This is a product description"
// };

const port = 3000;
export async function generateMetadata({params}: any){
  const { id } =   await params;
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/dummy`, {
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

    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/dummy`, {
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
     <div className="bg-neutral-59 absolute">
     <Breadcrumbs items={[
          { label: 'Products', href: '/products' },
          { label: result.name, href: `/products/${id}` },
        ]} />
     </div>
     <h1 className="text-neutral-50 bg-neutral-50">{result.name}</h1>
    <Video  product={result}/>
    </>
  )
}

export default Page