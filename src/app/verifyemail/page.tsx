"use client";

import { useState, useEffect } from 'react'
import axios from 'axios';
import Link from 'next/link';


const VerifyEmail = () => {
    const [token, setToken] = useState<String>("");
    const [verified, setVerified] = useState<Boolean>(false);
    const [error, setError] = useState<Boolean>(false);

    useEffect(() => {
        const urlToken = window?.location?.search ? window.location.search.split('=')[1] : "";
        setToken(urlToken);
    }, []);

    useEffect(() => {
        if (token) {
            verifyUserEmail();
        }
    }, [token]);

    const verifyUserEmail = async () => {
        try {
            await axios.post('/api/users/verifyemail', { token });
            setVerified(true);
        } catch (err: any) {
            setError(true);
            console.log(err.response.data);

            // Use react toast
        }
    }

    return (
        <div className='flex flex-col items-center justify-center min-h-screen py-2'>
            <h1 className='text-4xl font-bold mb-10'>Verify Email</h1>
            <h2 className='text-2xl p-2'>{token ? token : 'Token not found'}</h2>

            {verified && <div>
                <h2 className='test-2xl'>Email verified</h2>
                <div className='text-center mt-4 underline'>
                    <Link href="/login">Go to login page</Link>
                </div>
            </div>}

            {error && <div>
                <h2 className='test-2xl text-red-500'>Error</h2>
            </div>}
        </div>
    )
}

export default VerifyEmail