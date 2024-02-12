import { Paperclip, X } from '@phosphor-icons/react';
import { useRef, useState } from 'react';
import { uploadFiles } from '../service/message.service';
import { toast } from 'react-toastify';

const Upload = ({ files, setFiles }) => {
    const inputRef = useRef(null);
    const [loading, setLoading] = useState(false);
    const handleChange = async (event) => {
        const files = event.target.files;
        if (files && files.length) {
            
            if (files.length > 5) {
                toast.error('You can upload a maximum of 5 files.')
                return;
            }

            files.forEach((file) => {
                if (file.size > 10 * 1024 * 1024) {
                    toast.error('Image size exceeds the limit of 10 MB.')
                    return;
                }
            })

            const uploadPromises = [];
            try {
                setLoading(true);
                for (let i = 0; i < files.length; i++) {
                    const formData = new FormData();
                    formData.append('image', files[i]);
                    uploadPromises.push(uploadFiles(formData));
                }

                const result = await Promise.all(uploadPromises);
                let temp = [];
                result.forEach((img) => {
                    temp.push(img.data.display_url);
                })
                setFiles(temp);
                console.log('All files uploaded successfully!');
            } catch (error) {
                console.error('Error uploading files:', error.message);
                toast.error(error?.message || 'Uploading Server is Down');
            } finally {
                setLoading(false);
            }
        }
    };

    const handleRemove = (index) => {
        const newArray = [...files];
        newArray.splice(index, 1);
        setFiles(newArray);
    }

    return (
        <>
            {
                loading && (
                    <div className='absolute w-full backdrop-blur-sm top-0 left-0 h-full flex items-center justify-center flex-col gap-5'>
                        <div className="border-gray-300 h-12 w-12 animate-spin rounded-full border-4 border-t-blue-600" />
                    </div>
                )
            }
            {files.length > 0 && (
                <div className='bg-white border absolute w-full left-0 [bottom:64px]  px-6 py-5 overflow-y-auto'>
                    <div className='flex flex-row gap-8 '>
                        {
                            files.map((imgUrl, index) => (
                                <div key={index} className='relative'>
                                    <div className='absolute bg-white icon-btn cursor-pointer border rounded-full p-1 -right-2 -top-2' onClick={() => {
                                        handleRemove(index)
                                    }}>
                                        <X />
                                    </div>
                                    <img src={imgUrl} alt='working' className=' w-28 h-28 overflow-hidden object-contain rounded-md' />
                                </div>
                            ))
                        }
                    </div>
                </div>
            )}
            <div >
                <div className='icon-btn' onClick={() => {
                    inputRef.current.click();
                }}>
                    <Paperclip size={26} />
                    <input ref={inputRef} type='file' hidden accept="image/*" multiple onChange={handleChange} />
                </div>
            </div>
        </>
    )
}

export default Upload;