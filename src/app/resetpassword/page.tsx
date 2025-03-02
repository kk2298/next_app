"use client";

import axios from "axios";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function ResetPasswordPage() {
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [token, setToken] = useState("");
  const [resetDone, setResetDone] = useState(false);
  const [error, setError] = useState("");

  const resetPassword = async (e: any) => {
    e.preventDefault();
    if (!newPassword || !confirmPassword) {
      setError("Password can't be empty");
      toast.error("Password can't be empty");
      return;
    }
    if (newPassword !== confirmPassword) {
      setError("Passwords don't match");
      toast.error("Passwords don't match");
      return;
    }
    try {
      await axios.post("/api/resetpassword", { newPassword, token });
      setResetDone(true);
      toast.success("Password reset successful!");
    } catch (error: any) {
      console.log(error);
      setError(error.message);
      toast.error(error.message);
    }
  };

  useEffect(() => {
    const urlToken = window.location.search.split("=")[1];
    setToken(urlToken || "");
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center bg-neutral-50 px-4">
      <div className="max-w-md w-full bg-white p-8 rounded-lg shadow-md">
        <h2 className="text-2xl font-semibold text-center mb-6">Reset Password</h2>
        {resetDone ? (
          <div className="text-center">
            <p className="text-xl text-green-500 mb-4">Password reset successful!</p>
            <Link href="/signin" className="text-blue-500 hover:underline">Login Now</Link>
          </div>
        ) : (
          <>
            {error && <p className="text-red-500 text-center mb-4">{error}</p>}
            <form onSubmit={resetPassword}>
              <div className="mb-4">
                <label htmlFor="newPassword" className="block text-gray-700">New Password</label>
                <input
                  type="password"
                  id="newPassword"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                  required
                />
              </div>
              <div className="mb-6">
                <label htmlFor="confirmPassword" className="block text-gray-700">Confirm New Password</label>
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
                Reset Password
              </button>
            </form>
          </>
        )}
      </div>
      <ToastContainer />
    </div>
  );
}

export default ResetPasswordPage;