import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
const EditProduct = () => {
    const [title, setTitle] = useState('');
    const [file, setFile] = useState('');
    const [img, setImg] = useState('');
    const navigate = useNavigate();
    const { id } = useParams();
    const loadImage = (e) => {
        const image = e.target.files[0];
        setFile(image);
        setImg(URL.createObjectURL(image));
    };

    useEffect(() => {
        const getProductById = async () => {
            const res = await axios.get(
                `http://localhost:4000/api/products/${id}`
            );
            setTitle(res.data.name);
            setFile(res.data.image);
            setImg(res.data.url);
        };

        getProductById();
    }, []);

    const updateProduct = async (e) => {
        e.preventDefault();
        const formdata = new FormData();
        formdata.append('file', file);
        formdata.append('title', title);
        try {
            await axios.put(
                `http://localhost:4000/api/products/${id}`,
                formdata,
                {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    },
                }
            );
            navigate('/');
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <>
            <div>
                <form onSubmit={updateProduct}>
                    <div className='field'>
                        <label className='label'>ویرایش اسم محصول</label>
                        <input
                            type='text'
                            className='border-4 border-emerald-500'
                            name='title'
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                        />
                    </div>
                    <div className='field'>
                        <label className='label'>عکس</label>
                        <input
                            type='file'
                            className='border-4 border-emerald-500'
                            onChange={loadImage}
                        />
                        <span className='file-cta'>
                            <span className='file-label'>ویرایش عکس</span>
                        </span>
                    </div>

                    {img && <img src={img} alt='' className='w-52' />}

                    <div className='field'>
                        <div className='control'>
                            <button
                                type='submit'
                                className='bg-emerald-500 text-white p-3'
                            >
                                ذخیره
                            </button>
                        </div>
                    </div>
                </form>
            </div>
        </>
    );
};

export default EditProduct;
