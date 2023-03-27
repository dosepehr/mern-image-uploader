import { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
const ProductsList = () => {
    const [products, setProducts] = useState([]);
    useEffect(() => {
        const getProducts = async () => {
            const { data } = await axios.get(
                'http://localhost:4000/api/products'
            );
            setProducts(data);
        };
        getProducts();
    }, [products]);
    const deleteProduct = async (id) => {
        await axios.delete(`http://localhost:4000/api/products/${id}`);
    };
    return (
        <>
            <div className='my-10 flex items-center justify-center'>
                <Link to='/add' className='bg-pink-500 text-white px-2 py-4 '>
                    اضافه کردن محصول
                </Link>
            </div>
            <div className='grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3'>
                {products.length > 0 &&
                    products.map((item) => (
                        <div key={item.url}>
                            <img src={item.url} alt='' className='w-full' />
                            <p>{item.name}</p>
                            <button
                                onClick={() => deleteProduct(item.id)}
                                className='bg-sky-400 p-4 text-white hover:bg-sky-900 duration-300'
                            >
                                حذف
                            </button>
                            <Link
                                to={`/edit/${item.id}`}
                                className='bg-red-400 p-4 text-white hover:bg-red-900 duration-300'
                            >
                                ویرایش
                            </Link>
                        </div>
                    ))}
            </div>
        </>
    );
};

export default ProductsList;
