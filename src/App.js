import "../src/App.css";
import { Routes, Route } from "react-router-dom";
import Header from "./components/Header/Header";
import Main from "./components/main/Main";
import Basket from "./components/basket/Basket/Basket";
import AllSales from "./components/allSales/Sales";
import Footer from "./components/Footer/Footer";
import Categories from "./components/categories/Categories/Categories";
import AllProducts from "./components/products/AllProducts/allProducts";
import ProductsByCategories from "./components/products/ProductsByCategory/ProductsByCategory";
import SingleProduct from "./components/products/SingleProduct/SingleProduct";
import NotFound from "./components/notFound/notFound";

function App() {
  return (
    <div className="App">
      <Header />
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/categories" element={<Categories />} />
        <Route path="/basket" element={<Basket />} />
        <Route path="/sales" element={<AllSales />} />
        <Route path="/products" element={<AllProducts />} />
        <Route path="/categories/:id" element={<ProductsByCategories />} />
        <Route path="/products/:id" element={<SingleProduct />} />
        <Route path="/notFound" element={<NotFound />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
