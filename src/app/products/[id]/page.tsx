type Props = {}

import { Metadata } from "next"

// export const metadata: Metadata = {
//   title: "Product 1", 
//   description: "This is a product description"
// };

export async function generateMetadata({params}: any){
  const { id } =   await params;
  const response = await fetch('http://localhost:3000/api/dummy', {
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


const Page = (props: Props) => {

  return (
    <>
      <div className="w-full flex h-screen justify-center items-center bg-neutral-100">
      <iframe width="560" height="315"  src="https://www.youtube.com/embed/vwSlYG7hFk0?si=DhvYacmbJwkYBp9V" title="YouTube video player" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerPolicy="strict-origin-when-cross-origin" allowFullScreen />
      </div>

    </>
  )
}

export default Page