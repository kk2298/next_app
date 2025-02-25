'use client'

import React, {useState, useEffect} from 'react'

type Props = {
  product: any;
  similarProducts: any[];
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
    <div className="flex  bg-neutral-50 flex-col lg:flex-row">
      <div className="w-[100%] aspect-video my-8 lg:w-[70%] flex-1 flex  justify-center  bg-white">
        <iframe
          width="560"
          height="315"
          className="w-[70%] h-[60%]"
          src={product.url || undefined}
          title="YouTube video player"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          referrerPolicy="strict-origin-when-cross-origin"
          allowFullScreen
        />
      </div>

      <div className="flex flex-col items-center  lg:w-[30%] p-4">
        <h2 className="text-lg font-semibold mb-4">Related Videos</h2>
        {relatedVideos?.map((video) => (
          <div key={video.id} className="mb-4">
            <iframe
              width="100%"
              height="180"
              src={video.url}
              title={video.name}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              referrerPolicy="strict-origin-when-cross-origin"
              allowFullScreen
            />
            <p className="mt-2 text-sm">{video.name}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Video