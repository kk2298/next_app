'use client'
import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import logo from '../../../public/Images/logo.jpg';

type Props = {};

const Navbar = (props: Props) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userRole, setUserRole] = useState('');

  useEffect(() => {
    // Fetch user authentication status and role from local storage or API
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    if (user && user.token) {
      setIsAuthenticated(true);
      setUserRole(user.role);
    }
  }, []);

  const handleLogout = () => {
    // Clear user data from local storage and update state
    localStorage.removeItem('user');
    setIsAuthenticated(false);
    setUserRole('');
  };

  return (
<<<<<<< HEAD
    <nav className='w-screen bg-white fixed z-50 top-0 shadow-md flex justify-between items-center px-6'>
      <div className='w-28'>
        <Image src={logo} alt="Ramco" layout="responsive" />
=======
    <nav className='w-screen bg-white fixed z-50 top-0 shadow-md'>
      <div className='w-28 mx-6'>
        <img src={logo.src} alt='Ramco' className='w-28'/>
>>>>>>> b99c8148f317d07b2b41ce49b51d08f837593292
      </div>
      <div className='flex items-center'>
        {isAuthenticated ? (
          <>
            {userRole === 'admin' && (
              <Link href="/admin" legacyBehavior>
                <a className='mr-4 text-blue-500 hover:underline'>Admin</a>
              </Link>
            )}
            <button onClick={handleLogout} className='text-red-500 hover:underline'>
              Logout
            </button>
          </>
        ) : (
          <Link href="/signin" legacyBehavior>
            <a className='text-blue-500 hover:underline'>Sign In</a>
          </Link>
        )}
      </div>
    </nav>
  );
};

export default Navbar;