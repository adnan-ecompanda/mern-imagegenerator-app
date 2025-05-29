import React, { useContext, useState } from 'react'
import { assets } from '../assets/assets'
import { motion } from 'framer-motion'
import { AppContext } from '../context/AppContext';
import { useNavigate } from 'react-router-dom';

const Result = () => {
    const [image, setImage] = useState(assets.sample_img_1);
    const [isImageLoaded, setIsImageLoaded] = useState(false);
    const [loading, setLoading] = useState(false);
    const [input, setInput] = useState('');
    const { generateImage } = useContext(AppContext);
    const navigate = useNavigate();

    // const onSubmitHandler = async (e) => {
    //     e.preventDefault();
    //     setLoading(true);

    //     if (input) {
    //         try {
    //             const image = await generateImage(input);
    //             console.log("Generated image:", image);
    //             if (image) {
    //                 setImage(image);
    //                 setIsImageLoaded(true);
    //             }
    //         } catch (err) {
    //             console.error("Image generation failed:", err);
    //         }
    //     }

    //     setLoading(false);
    // };
    const onSubmitHandler = async (e) => {
        e.preventDefault();
        setLoading(true);

        const result = await generateImage(input);
        setLoading(false);

        if (result.success) {
            setImage(result.imageData);
            setIsImageLoaded(true);
        } else if (result.credit === 0) {
            navigate('/buy-credit'); // ✅ This now works, because credit check is in the `catch` block
        } else {
            toast.error(result.message || "Something went wrong");
        }
    };

    return (
        <motion.form onSubmit={onSubmitHandler} className='flex flex-col items-center justify-center min-h-[90vh]' initial={{ opacity: 0.2, y: 100 }} transition={{ duration: 1 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <div>
                <div className='relative'>
                    <img className='max-w-sm rounded' src={image} alt="" />
                    <span className={`absolute bottom-0 left-0 h-1 bg-blue-500 ${loading ? 'w-full transition-all duration-[10s]' : 'w-0'}  `} />
                </div>
                <p className={!loading ? 'hidden' : ''}>Loading.....</p>
            </div>
            {!isImageLoaded &&
                <div className='flex w-full max-w-xl bg-neutral-500 text-white text-sm p-0.5 mt-10 rounded-full'>
                    <input value={input} onChange={(e) => setInput(e.target.value)} className='flex-1 bg-transparent outline-none ml-8 max-sm:w-20 placeholder-color' type="text" placeholder='Describe what you want to generate' />
                    <button type="submit" className='bg-zinc-900 px-10 sm:px-16 py-3 rounded-full '>Generate</button>
                </div>
            }
            {isImageLoaded &&
                <div className='flex gap-2 flex-wrap justify-center text-white text-sm p-0.5 mt-10 rounded-full'>
                    <p onClick={() => setIsImageLoaded(false)} className='bg-transparent border border-zinc-900 text-black px-8 py-3 rounded-full cursor-pointer'>Generate Another</p>
                    <a className='bg-zinc-900 px-10 py-3 rounded-full cursor-pointer' download href={image}>Download</a>
                </div>
            }
        </motion.form>
    )
}

export default Result
