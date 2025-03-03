"use client";

import axios from "axios";
import Link from "next/link";
import React, { useState } from "react";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [sentEmail, setSentEmail] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      await axios.post("/api/forgotpassword", { email });
      setSentEmail(true);
      toast.success("Reset Password Email sent successfully!");
    } catch (error: any) {
      setError(error.response?.data?.error || error.message);
      toast.error(error.response?.data?.error || error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-neutral-50 px-4">
      <div className="max-w-md w-full bg-white p-8 rounded-lg shadow-md">
        <h2 className="text-2xl font-semibold text-center mb-6">Forgot Password</h2>
        {sentEmail ? (
          <p className="text-xl text-center text-green-500">
            Reset Password Email sent successfully!
          </p>
        ) : (<></>)}
          <>
            {/* {loading && <p className="text-center text-gray-500 mb-4">Processing...</p>} */}
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
                  disabled={sentEmail || loading} // Disable input if email sent or loading
                />
              </div>
              <button
                type="submit"
                disabled={loading || sentEmail} // Disable button if email sent or loading
                className={`w-full px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white ${
                  loading || sentEmail ? 'bg-gray-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700 focus:ring-blue-500'
                }`}
              >
                {loading ? "Sending..." : "Send Password Recovery Email"}
              </button>
            </form>
            <p className="text-center mt-4">
              <Link href="/signin" className="text-blue-500 hover:underline">Login Instead</Link>
            </p>
          </>
      
      </div>
      <ToastContainer />
    </div>
  );
}

export default ForgotPasswordPage;
