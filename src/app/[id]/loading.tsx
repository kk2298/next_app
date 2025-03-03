import { LoaderCircle } from 'lucide-react'
import React from 'react'

type Props = {}

const loading = (props: Props) => {
  return (
    <div className='flex items-center justify-center h-screen'>
    <LoaderCircle className='animate-spin' />
    </div>
  )
}

export default loading