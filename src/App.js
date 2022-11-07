
import './App.css';
import AddProducts from './components/AddProducts';
import ProductsTable from './components/ProductsTable';
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  return (
    <>
      
        <Routes>
          <Route path="/" element={<ProductsTable />} />
          <Route path="/:products" element={<AddProducts />} />
          {/* <Route path="/edit-product/:id" element={<AddProducts />} /> */}
        </Routes>
      
    </>
  );
}

export default App;
