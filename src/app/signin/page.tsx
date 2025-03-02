'use client'

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Link from 'next/link';
import axios from "axios";

const SignInPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    try {
      
      const response = await axios.post("/api/login", {email, password});
      console.log("Login success", response.data);
      toast.success("Login success");
      router.push("/products");
  } catch (error:any) {
    if (error.response.data.error === 'User does not exist') {
      setError('User does not exist');
      toast.error('User does not exist');
    } 
    else if (error.response.data.error === 'Invalid password') {
      setError('Invalid password');
      toast.error('Invalid password');
    }
    
    else {
      console.log("Login failed", error.message);
      toast.error(error.message);
    }
     
 
  }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-neutral-50 px-4">
      <div className="max-w-md w-full bg-white p-8 rounded-lg shadow-md">
        <h2 className="text-2xl font-semibold text-center mb-6">Sign In</h2>
        {error && <p className="text-red-500 text-center mb-4">{error}</p>}
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="email" className="block text-gray-700">Email</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
              required
            />
          </div>
          <div className="mb-6">
            <label htmlFor="password" className="block text-gray-700">Password</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-gray-300 text-black py-2 rounded-lg hover:bg-primary-dark transition duration-200"
          >
            Sign In
          </button>
        </form>
        <p className="text-center mt-4">
          <Link href="/forgotpassword" className="text-blue-500 hover:underline">Forgot Password?</Link>
        </p>
        <p className="text-center mt-4">
          Don't have an account? <Link href="/signup" className="text-blue-500 hover:underline">Sign Up</Link>
        </p>
      </div>
      <ToastContainer />
    </div>
  );
};

export default SignInPage;