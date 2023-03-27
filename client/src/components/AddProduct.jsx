import axios from 'axios';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
const AddProduct = () => {
    const navigate = useNavigate();
    const [img, setImg] = useState();
    const [file, setFile] = useState();
    const [title, setTitle] = useState();
    const loadImage = (e) => {
        const image = e.target.files[0];
        setFile(image);
        setImg(URL.createObjectURL(image));
    };
    const createProduct = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('file', file);
        formData.append('title', title);
        axios.post('http://localhost:4000/api/products', formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });
        navigate('/');
    };
    return (
        <div>
            <form action='' onSubmit={createProduct}>
                <div className='field'>
                    <label htmlFor='name'>نام محصول</label>
                    <input
                        onChange={(e) => setTitle(e.target.value)}
                        type='text'
                        name='name'
                        className='border-4 border-emerald-500'
                    />
                </div>
                <div className='field'>
                    <label htmlFor='img'>عکس محصول</label>
                    <input
                        onChange={loadImage}
                        type='file'
                        name='img'
                        className='border-4 border-emerald-500'
                    />
                </div>
                {img && <img src={img} alt='' className='w-52' />}

                <div className='field'>
                    <button
                        className='bg-emerald-500 text-white p-3'
                        type='submit'
                    >
                        ذخیره
                    </button>
                </div>
            </form>
        </div>
    );
};

export default AddProduct;
