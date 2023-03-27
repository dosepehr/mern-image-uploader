import { useEffect, useState } from 'react';
import axios from 'axios';
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
    }, []);
    return (
        <>
            <div className='grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3'>
                {products.length > 0 &&
                    products.map((item) => (
                        <div key={item.url}>
                            <img src={item.url} alt='' className='w-full' />
                            <p>{item.name}</p>
                            <button className='bg-sky-400 p-4 text-white hover:bg-sky-900 duration-300'>
                                حذف
                            </button>
                            <button className='bg-red-400 p-4 text-white hover:bg-red-900 duration-300'>
                                ویرایش
                            </button>
                        </div>
                    ))}
            </div>
        </>
    );
};

export default ProductsList;
