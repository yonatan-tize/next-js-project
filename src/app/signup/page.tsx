'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { toast } from 'react-hot-toast';

function Signup() {
  const router = useRouter();
  const [user, setUser] = useState({
    username: '',
    email: '',
    password: ''
  });
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  const onSignUp = async () => {
    try {
      setIsLoading(true);
      const response = await axios.post('./api/users/signup', user);
      console.log(response.data);

      toast.success('Signup successful!');
      router.push('/login');
    } catch (error) {
      if (axios.isAxiosError(error)) {
        toast.error(error.response?.data?.message || 'Signup failed!');
      } else {
        console.error('An unexpected error occurred');
        toast.error('An unexpected error occurred');
      }
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const { email, username, password } = user;
    setIsButtonDisabled(!(email && username && password));
  }, [user]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-300">
      <h1 className="text-3xl mb-4">Signup</h1>
      <div className="mb-4">
        <label htmlFor="username" className="block mb-2">User Name</label>
        <input
          id="username"
          className="p-2 text-gray-600 rounded-md min-w-72"
          type="text"
          value={user.username}
          placeholder="Name"
          onChange={(e) => setUser({ ...user, username: e.target.value })}
        />
      </div>
      <div className="mb-4">
        <label htmlFor="email" className="block mb-2">Email</label>
        <input
          id="email"
          className="p-2 text-gray-600 rounded-md min-w-72"
          type="email"
          value={user.email}
          placeholder="Email"
          onChange={(e) => setUser({ ...user, email: e.target.value })}
        />
      </div>
      <div className="mb-4">
        <label htmlFor="password" className="block mb-2">Password</label>
        <input
          id="password"
          className="p-2 text-gray-600 rounded-md min-w-72"
          type="password"
          value={user.password}
          placeholder="Password"
          onChange={(e) => setUser({ ...user, password: e.target.value })}
        />
      </div>
      <button
        type="submit"
        className="bg-gray-800 text-white m-4 px-4 py-2 rounded-md disabled:opacity-50"
        onClick={onSignUp}
        disabled={isButtonDisabled || isLoading}
      >
        {isLoading ? 'Loading...' : 'Signup'}
      </button>
      <Link href="/login" className="text-blue-500 hover:underline">
        Go to login
      </Link>
    </div>
  );
}

export default Signup;
