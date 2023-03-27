import ProductsList from './components/ProductsList';
import EditProduct from './components/EditProduct';
import { Route, Routes } from 'react-router-dom';
import AddProduct from './components/AddProduct';
function App() {
    return (
        <Routes>
            <Route path='/' element={<ProductsList />} />
            <Route path='/edit/:id' element={<EditProduct />} />
            <Route path='/add' element={<AddProduct />} />
        </Routes>
    );
}

export default App;

