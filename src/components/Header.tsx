"use client";
import { MouseEvent } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';

const Header = () => {
    const router = useRouter();

    const logoutHandler = async (e: MouseEvent<HTMLButtonElement>) => {
        try {
            await axios.get('/api/users/logout');

            // Redirect the user to the login page
            router.push('/login');
        } catch (err: any) {
            // use react toast
            console.error('Logout failed', err.message);
        }
    };

    return (
        <header className="p-4 fixed w-full flex justify-between items-center bg-slate-200">
            <div>
            </div>
            <div>
                <button
                    className='text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center disabled:bg-blue-300'
                    onClick={logoutHandler} >
                    logout
                </button>
            </div>
        </header>
    )
}

export default Header