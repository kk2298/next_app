'use client'
import React, {} from 'react'
import { usePathname } from 'next/navigation'
import Link from 'next/link'
import { FolderClosed } from 'lucide-react'

type Props = {}

const Breadcrumbs = ({items}: any) => {
  return (
    <>
     <div className="">
     <ol className="w-screen  flex pt-8 bg-neutral-50 pl-6 mt-14">
     <FolderClosed  className="mr-2 text-blue-500"/>
        {items?.map((item, index) => (
          <li key={index} className="flex items-center">
            <Link href={item.href}  className="hover:underline text-blue-500">
              {item.label}
            </Link>
            {index < items.length - 1 && <span className="mx-2">/</span>}
          </li>
        ))}
      </ol>
     </div>
    </>
  )
}


export default Breadcrumbs;