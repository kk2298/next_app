import React from 'react'
import Image from 'next/image'
import logo from '../../../public/Images/logo.jpg'

type Props = {}

const Navbar = (props: Props) => {
  return (
    <nav className='w-screen bg-white fixed z-50 top-0 shadow-md'>
      <div className='w-28 mx-6'>
        <Image src={logo} alt="Ramco" layout="responsive" />
      </div>
    </nav>
  )
}

export default Navbar