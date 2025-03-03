'use client'
import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import logo from '../../../public/Images/logo.jpg';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';
import Cookies from 'js-cookie';

type Props = {};

const Navbar = (props: Props) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userRole, setUserRole] = useState('');
  const [token, setToken] = useState(Cookies.get('token'));
  const router = useRouter();

  const checkAuth = async () => {
    try {
      const token = Cookies.get('token');
      console.log(token);
      if (token) {
        const response = await axios.get('/api/helper');
        setIsAuthenticated(true);
        // setUserRole(response.data.data.role);
        setUserRole('admin')
      } else {
        setIsAuthenticated(false);
        setUserRole('');
      }
    } catch (error) {
      console.error(error);
      setIsAuthenticated(false);
      setUserRole('');
    }
  };

  useEffect(() => {
    checkAuth();
  }, [token]);

  useEffect(() => {
    const handleCookieChange = () => {
      setToken(Cookies.get('token'));
    };

    // Listen for cookie changes
    const interval = setInterval(handleCookieChange, 1000);

    return () => {
      clearInterval(interval);
    };
  }, []);

  const handleLogout = async () => {
    try {
      await axios.get('/api/logout');
      toast.success('Logout successful');
      Cookies.remove('token');
      Cookies.remove('role');
      setIsAuthenticated(false);
      setUserRole('');
      router.push('/products');
    } catch (error: any) {
      console.log(error.message);
      toast.error(error.message);
    }
  };

  return (
    <nav className='w-screen bg-white fixed z-50 top-0 shadow-md flex justify-between items-center px-6'>
      <div className='w-28'>
        <Image src={logo} alt="Ramco" layout="responsive" />
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