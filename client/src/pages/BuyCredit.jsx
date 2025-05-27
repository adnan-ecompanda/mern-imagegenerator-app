import React, { useContext } from 'react'
import { assets, plans } from '../assets/assets'
import { AppContext } from '../context/AppContext';
import { motion } from 'framer-motion'
const BuyCredit = () => {
    const { user } = useContext(AppContext);
    return (
        <motion.div className='text-center min-h-[80vh] pt-14 mb-10' initial={{ opacity: 0.2, y: 100 }} transition={{ duration: 1 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <button className='border border-gray-400 px-10 py-2 rounded-full mb-6 cursor-pointer'>Our Plans</button>
            <h1 className='text-center text-3xl font-medium mb-6 sm:mb-10'>Choose your plan</h1>

            <div className='flex flex-wrap justify-center gap-6 text-left'>
                {plans.map((item, index) => (
                    <div key={index} className='bg-white drop-shadow-sm py-12 rounded-lg border px-8 text-gray-600 hover:scale-105 transition-all duration-500'>
                        <img width={40} src={assets.logo_icon} alt="" />
                        <p className='mt-3 mb-1 font-semibold'>{item.id}</p>
                        <p className='text-sm'>{item.desc}</p>
                        <p className='mt-6'><span className='font-medium text-3xl'>${item.price}</span> / {item.credits} credits</p>
                        <button className='w-full bg-gray-800 text-white mt-8 py-2.5 text-sm rounded-md min-w-52 cursor-pointer'>{user ? 'Buy Now' : 'Get Started'}</button>
                    </div>
                ))}
            </div>
        </motion.div>
    )
}

export default BuyCredit
