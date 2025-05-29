import React, { useContext, useEffect, useState } from 'react';
import { assets } from '../assets/assets';
import { motion } from 'framer-motion';
import { AppContext } from '../context/AppContext';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const Result = () => {
    const [image, setImage] = useState(assets.sample_img_1);
    const [isImageLoaded, setIsImageLoaded] = useState(false);
    const [loading, setLoading] = useState(false);
    const [input, setInput] = useState('');
    const [previousImages, setPreviousImages] = useState([]);

    const { generateImage, fetchUserImages } = useContext(AppContext);
    const navigate = useNavigate();

    const loadUserImages = async () => {
        const images = await fetchUserImages();
        setPreviousImages(images);
    };

    useEffect(() => {
        loadUserImages();
    }, []);

    const onSubmitHandler = async (e) => {
        e.preventDefault();
        setLoading(true);

        const result = await generateImage(input);
        setLoading(false);

        if (result.success) {
            setImage(result.imageData);
            setIsImageLoaded(true);
            loadUserImages(); // refresh images
        } else if (result.credit === 0) {
            navigate('/buy-credit');
        } else {
            toast.error(result.message || "Something went wrong");
        }
    };

    return (
        <motion.form onSubmit={onSubmitHandler} className='flex flex-col items-center justify-center min-h-[90vh]' initial={{ opacity: 0.2, y: 100 }} transition={{ duration: 1 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <div>
                <div className='relative'>
                    <img className='max-w-sm rounded' src={image} alt="" />
                    <span className={`absolute bottom-0 left-0 h-1 bg-blue-500 ${loading ? 'w-full transition-all duration-[10s]' : 'w-0'}`} />
                </div>
                <p className={!loading ? 'hidden' : ''}>Loading.....</p>
            </div>

            {!isImageLoaded &&
                <div className='flex w-full max-w-xl bg-neutral-500 text-white text-sm p-0.5 mt-10 rounded-full'>
                    <input value={input} onChange={(e) => setInput(e.target.value)} className='flex-1 bg-transparent outline-none ml-8 max-sm:w-20 placeholder-color' type="text" placeholder='Describe what you want to generate' />
                    <button type="submit" className='bg-zinc-900 px-10 sm:px-16 py-3 rounded-full'>Generate</button>
                </div>
            }

            {isImageLoaded &&
                <div className='flex gap-2 flex-wrap justify-center text-white text-sm p-0.5 mt-10 rounded-full'>
                    <p onClick={() => setIsImageLoaded(false)} className='bg-transparent border border-zinc-900 text-black px-8 py-3 rounded-full cursor-pointer'>Generate Another</p>
                    <a className='bg-zinc-900 px-10 py-3 rounded-full cursor-pointer' download href={image}>Download</a>
                </div>
            }

            {previousImages.length > 0 && (
                <div className='w-full px-4 mt-10'>
                    <h2 className='text-xl font-semibold text-center mb-6'>Your Previous Generations</h2>
                    <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4'>
                        {previousImages.map((img, index) => (
                            <div key={img._id} className='bg-white p-2 rounded shadow flex flex-col items-center'>
                                <img
                                    src={img.imageUrl}
                                    alt={img.prompt}
                                    className='w-full h-48 object-cover rounded'
                                />
                                <p className='text-xs mt-2 text-center'>{img.prompt}</p>

                                <a
                                    href={img.imageUrl}
                                    download={`generated-${index + 1}.png`}
                                    className='mt-2 bg-blue-500 text-white text-xs px-3 py-1 rounded hover:bg-blue-600 transition'
                                >
                                    Download
                                </a>
                            </div>
                        ))}
                    </div>
                </div>
            )}

        </motion.form>
    );
};

export default Result;
