import React from 'react'
import { assets } from '../assets/assets'
import { motion } from 'framer-motion'

const Description = () => {
    return (
        <motion.div className='flex flex-col items-center justify-center my-24 p-6 md:px-28' initial={{ opacity: 0.2, y: 100 }} transition={{ duration: 1 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <h1 className='text-3xl sm:text-4xl font-semibold'>Create AI Images</h1>
            <p className='text-gray-500 mb-8'>Turn your imagination to visuals</p>
            <div className='flex flex-col md:flex-row items-center md:gap-14 gap-5'>
                <img className="w-80 xl:w-96 rounded-lg" src={assets.sample_img_1} alt="" />
                <div>
                    <h2 className='text-3xl font-medium max-w-lg mb-4'>Introducing the AI-Powered Image Generator</h2>
                    <p className='text-gray-600 mb-4'>Experience the power of AI-generated visuals with our advanced text-to-image generator. Simply enter your text, and in seconds, get stunning visuals that are perfect for your needs. Experience the power of AI-generated visuals with our advanced text-to-image generator. Simply enter your text, and in seconds, get stunning visuals that are perfect for your needs.</p>
                    <p className='text-gray-600'>Experience the power of AI-generated visuals with our advanced text-to-image generator. Simply enter your text, and in seconds, get stunning visuals that are perfect for your needs. Experience the power of AI-generated visuals with our advanced text-to-image generator. Simply enter your text, and in seconds, get stunning visuals that are perfect for your needs.</p>
                </div>
            </div>
        </motion.div>
    )
}

export default Description
