import { useParams } from 'react-router-dom';
const EditProduct = () => {
    const { id } = useParams();
    return <div>{id}</div>;
};

export default EditProduct;
