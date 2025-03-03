import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import productImages from '../constants'

type Props = {}

const Card = ({product}: any) => {
  return (
    <Link href={`/${product?.product_id}`}  >
    <div className="bg-white overflow-hidden rounded-xl shadow-lg transform hover:scale-105 transition-transform duration-300 animate__animated animate__fadeInUp">
      <div className="aspect-w-16 aspect-h-9 bg-white p-4">
        <div className="flex items-center justify-center h-48 bg-white overflow-hidden">
          <img src={product?.image || undefined} alt={product?.name} className='object-contain w-full h-full' />
        </div>
      </div>
      <div className="h-28 flex text-center justify-center items-center">
        <h3 className="text-xl font-semibold mb-2">{product.name}</h3>
      </div>
    </div>
  </Link>
  )
}

export default Card