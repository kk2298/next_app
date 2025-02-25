import React from 'react'
import logo from '../../../public/Images/logo.jpg'

type Props = {}

const Navbar = (props: Props) => {
  return (
    
    <nav className='w-screen bg-white fixed z-50 top-0 shadow-md'>
      <img src={logo.src} alt="Ramco" className='w-28 mx-6'/>
    </nav>
  )
}

export default Navbar