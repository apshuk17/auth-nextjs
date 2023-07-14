"use client";
import { ChangeEvent, FormEventHandler, useState } from 'react';
import { useRouter } from "next/navigation";
import axios from "axios";

import React from 'react'
import Link from 'next/link';

const Signup = () => {
  const [user, setUser] = useState({
    email: '',
    password: '',
    userName: ''
  });

  const onSignUp = async () => {

  }

  const onUserNameChangeHandler = (e: ChangeEvent<HTMLInputElement>) => setUser((prevState) => ({ ...prevState, userName: e.target.value }));
  const onEmailChangeHandler = (e: ChangeEvent<HTMLInputElement>) => setUser((prevState) => ({ ...prevState, email: e.target.value }));
  const onPasswordChangeHandler = (e: ChangeEvent<HTMLInputElement>) => setUser((prevState) => ({ ...prevState, password: e.target.value }));

  const onSubmitHandler: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    console.log('Signup state', user);
  }

  return (
    <div className='flex flex-col items-center justify-center min-h-screen py-2'>
      <h1 className='text-4xl font-bold mb-10'>Signup</h1>
      <hr />

      <form className='w-[350px]' onSubmit={onSubmitHandler}>
        <div className='mb-4'>
          <label className='mr-2' htmlFor='username'>Username</label>
          <input autoComplete='off' className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 outline-none' id="username" type="text" placeholder="Enter username" value={user.userName} onChange={onUserNameChangeHandler} />
        </div>

        <div className='mb-4'>
          <label className='mr-2' htmlFor='email'>Email</label>
          <input autoComplete='off' className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 outline-none' id="email" type="email" placeholder="Enter email" value={user.email} onChange={onEmailChangeHandler} />
        </div>

        <div className='mb-4'>
          <label className='mr-2' htmlFor='password'>Password</label>
          <input autoComplete='off' className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 outline-none' id="password" type="password" placeholder="Enter email" value={user.password} onChange={onPasswordChangeHandler} />
        </div>

        <div className='mb-4'>
          <button className='text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center' type="submit">Submit</button>
        </div>
      </form>

      <div className='text-center mt-4 underline'>
        <Link href="/login">Visit login page</Link>
      </div>
    </div>
  )
}

export default Signup;
