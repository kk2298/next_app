type Props = {}

import { Metadata } from "next"
import Video from "./Video";
import Link from "next/link";
import Head from "next/head";
import Breadcrumbs from '../components/breadcrumbs'

// export const metadata: Metadata = {
//   title: "Product 1", 
//   description: "This is a product description"
// };

const port = 3000;
export async function generateMetadata({params}: any){
  const {id } =   await params;
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/products/get-by-product-id/`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({product_id: id}),
  });
  const product = await response.json();
  return {
    title: product?.name || "product",
    description: product?.description || "Product desc"
  }
}


const Page = async ({params}: any) => {
    const {id} = await params;

    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/products/get-by-product-id`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({product_id: id}),
    });
    const result = await response.json();

  return (
    <>
      <Head>
        <title>{result.name}</title>
        <meta property="og:title" content={`${result.name}`} />
        <meta property="og:description" content={`${result.description}`} />
      </Head>
     <div className="bg-neutral-50 pb-5">
     <Breadcrumbs items={[
          { label: 'Products', href: '/' },
          { label: result.name, href: `/${result?.product_id}` },
        ]} />
     </div>
    <Video  product={result}/>
    </>
  )
}

export default Page