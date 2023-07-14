"use client";
import { ChangeEvent, FormEventHandler, useState, useEffect } from 'react';
import { useRouter } from "next/navigation";
import axios from "axios";

import React from 'react'
import Link from 'next/link';

const Login = () => {
    const router = useRouter();

    const [user, setUser] = useState({
        email: '',
        password: '',
    });

    useEffect(() => {
        if (user.email.length > 0 && user.password.length > 0) {
            setButtonDisabled(false);
        } else {
            setButtonDisabled(true);
        }
    }, [user.email, user.password]);

    const [buttonDisabled, setButtonDisabled] = useState(true);
    const [loading, setLoading] = useState(false);


    const onLogin = async () => {
        try {
            // Set loading as true 
            setLoading(true);

            // Send the POST request
            const response = await axios.post("/api/users/login", user);
            console.log('##login success', response.data);

            // Redirect the user to login screen
            router.push("/profile");
        } catch (err: any) {
            // use react hot toast library
            console.error('Login failed', err.message);
        } finally {
            setLoading(false);
        }
    }

    const onEmailChangeHandler = (e: ChangeEvent<HTMLInputElement>) => setUser((prevState) => ({ ...prevState, email: e.target.value }));
    const onPasswordChangeHandler = (e: ChangeEvent<HTMLInputElement>) => setUser((prevState) => ({ ...prevState, password: e.target.value }));

    const onSubmitHandler: FormEventHandler<HTMLFormElement> = (e) => {
        e.preventDefault();
        console.log('Login state', user);
        onLogin();
    }

    return (
        <div className='flex flex-col items-center justify-center min-h-screen py-2'>
            <h1 className='text-4xl font-bold mb-10'>{loading ? 'Processing...' : 'Login'}</h1>

            <form className='w-[350px]' onSubmit={onSubmitHandler}>
                <div className='mb-4'>
                    <label className='mr-2' htmlFor='email'>Email</label>
                    <input autoComplete='off' className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 outline-none' id="email" type="email" placeholder="Enter email" value={user.email} onChange={onEmailChangeHandler} />
                </div>

                <div className='mb-4'>
                    <label className='mr-2' htmlFor='password'>Password</label>
                    <input autoComplete='off' className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 outline-none' id="password" type="password" placeholder="Enter email" value={user.password} onChange={onPasswordChangeHandler} />
                </div>

                <div className='mb-4'>
                    <button disabled={buttonDisabled} className='text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center disabled:bg-blue-300' type="submit">Submit</button>
                </div>
            </form>

            <div className='text-center mt-4 underline'>
                <Link href="/signup">Visit Signup page</Link>
            </div>
        </div>
    )
}

export default Login;
