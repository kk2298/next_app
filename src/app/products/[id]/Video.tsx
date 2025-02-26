'use client'

import React, {useState, useEffect} from 'react'
import Link from 'next/link'
type Props = {
  product: any;
}

const Video = ({ product }: Props) => {
  const [relatedVideos, setRelatedVideos] = useState([]);


  useEffect(()=>{
    async function fetchRelatedProducts(){

      const response2 = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/related`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({id: product.id, tags: product.tags || []}),
      }); 
      
      const relatedProducts = await response2.json();
      setRelatedVideos(relatedProducts.data)
    }

    fetchRelatedProducts();

  },[])
  return (
    <div className="flex  bg-white flex-col lg:flex-row  md:px-8 gap-8">
      <div className=" my-8  flex-1 flex  justify-center  bg-white">
        <iframe
          className="w-full  h-[450px]"
          src={product.url || undefined}
          title="YouTube video player"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          referrerPolicy="strict-origin-when-cross-origin"
          allowFullScreen
        />
      </div>
      
      <div className="px-4 md:px-0">
        <h2 className="text-lg font-semibold mb-4">Related Videos</h2>
        <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 lg:grid-cols-1'>
        {relatedVideos?.map((video:any) => (
          <div  className="mb-6 max-w-[350px]" key={video.id}>
            <iframe
            className="responsive-iframe pointer-events-none w-full h-full"
              src={video.url}
              title={video.name}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              referrerPolicy="strict-origin-when-cross-origin"
              allowFullScreen
            />
            <Link key={video.id} href={`/products/${video.id}`}>
            <p className="mb-2 text-md text-blue-500 underline font-medium hover:text-blue-800">{video.name}</p>
          </Link>
          </div>
        ))}
        </div>

      </div>

    </div>
  )
}

export default Video