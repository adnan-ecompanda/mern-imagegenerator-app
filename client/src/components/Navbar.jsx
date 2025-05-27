import React, { useContext } from 'react'
import { assets } from '../assets/assets'
import { Link, useNavigate } from 'react-router-dom'
import { AppContext } from '../context/AppContext';

const Navbar = () => {
    const navigater = useNavigate();
    const { user, setShowLogin } = useContext(AppContext);
    return (
        <div className='flex justify-between items-center py-4'>
            <Link to="/">
                <img src={assets.logo} alt="Logo" className='w-28 sm:w-32 lg:w-40' />
            </Link>
            <div>
                {user ? (
                    <div className='flex items-center gap-2 sm:gap-3'>
                        <button onClick={() => navigater('/buy-credit')} className='flex items-center gap-2 bg-blue-100 rounded-full px-4 sm:px-6 py-1.5 sm:py-3 hover:scale-105 transition-all duration-700 cursor-pointer'>
                            <img src={assets.credit_star} alt="Credit" className='w-5 rounded-full' />
                            <p className='text-xs sm:text-sm font-medium text-gray-600'>Credit left: 50</p>
                        </button>
                        <p className='text-gray-600 max-sm:hidden pl-4'>Hi, Daniweber</p>
                        <div className='relative group'>
                            <img src={assets.profile_icon} alt="Profile" className='w-10 drop-shadow' />
                            <div className='absolute hidden group-hover:block top-0 right-0 z-10 text-black rounded pt-12'>
                                <ul className='list-none m-0 p-2 bg-white rounded-md border text-sm'>
                                    <li className='px-2 py-1 cursor-pointer pr-10'>
                                        Logout
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                ) : (
                    <div className='flex items-center gap-2 sm:gap-5'>
                        <p onClick={() => navigater('/buy-credit')} className='cursor-pointer'>Pricing</p>
                        <button onClick={() => setShowLogin(true)} className='bg-zinc-800 text-white rounded-full py-2 px-7 sm:px-10 text-sm cursor-pointer'>Login</button>
                    </div>
                )}
            </div>
        </div>
    )
}

export default Navbar
