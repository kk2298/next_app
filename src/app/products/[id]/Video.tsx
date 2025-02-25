'use client'

import { useSearchParams } from 'next/navigation'
import React, { useEffect } from 'react'

type Props = {
 
}

const Video = ({product}: any) => {
  return (
   <>
    
    <div className="w-full flex h-screen justify-center items-center bg-neutral-50">
      <iframe width="560" height="315"  src={product.url || undefined} title="YouTube video player" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerPolicy="strict-origin-when-cross-origin" allowFullScreen />
      </div>
   </>
  )
}

export default Video