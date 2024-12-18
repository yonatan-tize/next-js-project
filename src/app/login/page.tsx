'use client';

import Link from 'next/link';
import React, { useState } from 'react'

function Login() {
  const [user, setUser] = useState({
    email: '',
    password: ''
  });

  const onLogin = () => {

  }
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
      onClick={onLogin}>
        Login
      </button>
      <Link href='signup'>got to signup</Link>
    </div>
  )
}

export default Login
