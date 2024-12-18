'use client';

import axios from 'axios';
import Link from 'next/link';
import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation';

function Login() {
  const router = useRouter();
  const [user, setUser] = useState({
    email: '',
    password: ''
  });

  const [isButtonDisabled, setIsButtonDisabled] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  const onLogin = async () => {
    try {
      setIsLoading(true);
      const response = await axios.post('./api/users/login', user);
      console.log(response.data);

      toast.success('Login successful!');
      router.push('/');
    } catch (error) {
      if (axios.isAxiosError(error)) {
        toast.error(error.response?.data?.message || 'Login failed!');
      } else {
        console.error('An unexpected error occurred');
        toast.error('An unexpected error occurred');
      }
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    const { email, password } = user;
    setIsButtonDisabled(!(email && password));
  }, [user]);

  return (
    <div className='flex flex-col items-center justify-center min-h-screen bg-gray-300'>
      <h1 className='text-3xl mb-4'>Login</h1>
      <div>
        <label htmlFor="email" className='block'>Email</label>
        <input 
          className='p-2 text-gray-600 rounded-md min-w-72'
          type="text" 
          value={user.email}
          name='email'
          placeholder='Email'
          onChange={(e) => {
            setUser({...user, email: e.target.value})
          }}
        />
      </div>
      <div>
        <label htmlFor="password" className='block'>Password</label>
        <input 
          className='p-2 text-gray-600 rounded-md min-w-72'
          type="text" 
          value={user.password}
          name='password'
          placeholder='Password'
          onChange={(e) => {
            setUser({...user, password: e.target.value})
          }}
        />
      </div>
      <button 
      type='submit' 
      className='bg-gray-800 text-white m-4 px-4 py-2 rounded-md' 
      onClick={onLogin}
      disabled={isButtonDisabled || isLoading}
      >
        {isLoading ? 'Loading...' : 'Signup'}
      </button>
      <Link href='signup' className="text-blue-500 hover:underline">got to signup</Link>
    </div>
  )
}

export default Login
