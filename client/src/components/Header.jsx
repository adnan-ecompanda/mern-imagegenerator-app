import React from 'react'
import { assets } from '../assets/assets'
const Header = () => {
    return (
        <div className='flex flex-col justify-center items-center text-center my-20'>
            <div className='text-stone-500 inline-flex text-center gap-2 bg-white px-6 py-1 rounded-full border border-neutral-500'>
                <p>Leading text-to-image creation tool</p>
                <img src={assets.star_icon} alt="Header" />
            </div>
            <h1 className='text-4xl max-w-[300px] sm:text-7xl sm:max-w-[590px] mx-auto mt-10 text-center'>From text to <span className='text-blue-600'>visuals</span>  — instantly</h1>
            <p className='text-center max-w-xl mx-auto mt-5'>Bring your ideas to life with our advanced text-to-image generator. Simply enter your text, and in seconds, get high-quality, AI-generated visuals tailored to your words.</p>
            <button className='sm:text-lg text-white bg-black w-auto mt-8 px-12 py-2.5 flex items-center gap-2 rounded-full'>
                Generate Images
                <img className='h-6' src={assets.star_group} alt="" />
            </button>

            <div>
                {Array(6).fill('')?.map((item, index) => (
                    < img className='rounded hover:scale-105 transition-all duration-300 cursor-pointer max-sm:w-10' src={assets.sample_img_1} alt="" key={index} width={70} />
                ))}
            </div>
        </div>
    )
}

export default Header
