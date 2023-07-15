'use client';
import { useState, useEffect } from 'react';
import axios from "axios";
import Link from 'next/link';

interface UserData {
    _id: String;
    email: String;
    username: String;
}


const UserDetails = () => {
    const [user, setUser] = useState<UserData | null>(null);

    const fetchUserDetails = async () => {
        const response = await axios.get('/api/users/aboutself');
        const { data: { data: userData = {} } } = response;
        console.log('##userData', userData);

        setUser(userData);
    }

    useEffect(() => {
        return () => {
            setUser(null);
        }
    }, []);

    return (
        <>
            {!user ? <button
                className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center disabled:bg-blue-300"
                onClick={fetchUserDetails}
            >Get User Details</button> : null}

            <div className='text-center'>
                {user?.email ? <>
                    <h2 className='text-xl font-bold mb-4'>{user.email}</h2>
                    <Link className='text-blue-500 underline' href={`/profile/${user._id}`}>Go to user profile</Link>
                </> : null}
            </div>
        </>
    )
}

export default UserDetails