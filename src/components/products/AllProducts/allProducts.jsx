import { Link } from "react-router-dom";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getAllProducts } from "../../../store/slices/allProductsSlice";
import s from "./allProducts.module.css";
import FilterForm from "../../FiltersForms/FilterForm/FilterForm";
import SaleForm from "../../FiltersForms/SaleForm/SaleForm";
import SortForm from "../../FiltersForms/SortForm/SortForm";
import ProductCard from "../ProductCard/ProductCard";
function Products() {
  const products = useSelector((state) => state.products.list);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllProducts());
  }, [dispatch]);

  return (
    <main className={s.main}>
      <div className={s.navWrapper}>
        <Link className={s.link} to="/">
          Main page
        </Link>
        <div className={s.line}></div>
        <Link id={s.activeLink} to="/products">
          All products
        </Link>
      </div>
      <h4 className={s.title}>All products</h4>
      <div style={{ display: "flex", marginBottom: "50px" }}>
        <FilterForm />
        <SaleForm />
        <SortForm />
      </div>
      <ul className={s.productsContainer}>
        {products
          ?.filter((el) => el.showProduct && el.showProductFilter)
          .map((product) => {
            return <ProductCard key={product.id} {...product} />;
          })}
      </ul>
    </main>
  );
}
export default Products;
