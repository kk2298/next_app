'use client'
import Link from 'next/link';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from "axios";

const SignUpPage = () => {
  const [username,setname] =useState('')
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  const validateEmail = (email: string) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(String(email).toLowerCase());
  };

  const validatePassword = (password: string) => {
    // Example: Password must be at least 6 characters long
    return password.length >= 6;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!validateEmail(email)) {
      setError('Invalid email format');
      toast.error('Invalid email format');
      return;
    }

    if (!validatePassword(password)) {
      setError('Password must be at least 6 characters long');
      toast.error('Password must be at least 6 characters long');
      return;
    }

    if (password !== confirmPassword) {
      setError('Passwords do not match');
      toast.error('Passwords do not match');
      return;
    }

    // Replace with your sign-up logic
    // For example, call an API to create a new user
    // If successful, redirect to the dashboard or login page
    try
    {
      const response = await axios.post("/api/signup", {username,email,password});
            console.log("Signup success", response.data);
            router.push("/signin");
    }
    catch (error:any) {
      console.log("Signup failed", error.message);
      
      if (error.response.data.error === 'User already exists') {
        setError('User already exists');
        toast.error('User already exists');
      } else {
        toast.error(error.message);
      }
  }
   
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 pt-8 px-4">
      <div className="w-full max-w-sm bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-2xl font-semibold text-center mb-6">Sign Up</h2>
        {error && <p className="text-red-500 text-center mb-4">{error}</p>}
        <form onSubmit={handleSubmit}>
        <div className="mb-4">
            <label htmlFor="username" className="block text-gray-700">Name</label>
            <input
              type="username"
              id="username"
              value={username}
              onChange={(e) => setname(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
              required
            />
          </div>
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
          <div className="mb-4">
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
          <div className="mb-6">
            <label htmlFor="confirmPassword" className="block text-gray-700">Confirm Password</label>
            <input
              type="password"
              id="confirmPassword"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-gray-300 text-black py-2 rounded-lg hover:bg-primary-dark transition duration-200"
          >
            Sign Up
          </button>
        </form>
        <p className="text-center mt-4">
          Already have an account? <Link href="/signin" className="text-blue-500 hover:underline">Sign In</Link>
        </p>
      </div>
      <ToastContainer />
    </div>
  );
};

export default SignUpPage;