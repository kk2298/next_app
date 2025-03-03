'use client'

import React, {useState, useEffect} from 'react'
import Link from 'next/link'
type Props = {
  product: any;
}

const Video = ({ product }: Props) => {
 
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
    
    </div>
  )
}

export default Video