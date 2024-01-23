import { Link } from "react-router-dom";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getAllProducts } from "../../store/slices/allProductsSlice";
import s from "./Sales.module.css";
import ProductCard from "../products/ProductCard/ProductCard";
import SortForm from "../FiltersForms/SortForm/SortForm";
import FilterForm from "../FiltersForms/FilterForm/FilterForm";

function Sales() {
  const productsList = useSelector((state) => state.products.list);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllProducts());
  }, [dispatch]);

  const discountedItems =
    productsList && productsList.filter((product) => product.discont_price);

  return (
    <main className={s.productsContainer}>
      <div className={s.navWrap}>
        <Link className={s.link} to="/">
          Main page
        </Link>
        <div className={s.greyLine}></div>
        <Link id={s.activeLink} to="/sales">
          All sales
        </Link>
      </div>
      <h4 className={s.title}>Discounted items</h4>
      <div
        style={{ display: "flex", marginBottom: "50px" }}
        className={s.filterSortWrap}
      >
        <FilterForm />
        <SortForm />
      </div>
      <ul className={s.productWrap}>
        {discountedItems
          ?.filter((el) => el.showProduct && el.showProductFilter)
          .map((discountedItem) => {
            return <ProductCard key={discountedItem.id} {...discountedItem} />;
          })}
      </ul>
    </main>
  );
}
export default Sales;
