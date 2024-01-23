import s from "./ProductsByCategory.module.css";
import { Link, useParams } from "react-router-dom";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchProductsOfCategory } from "../../../store/slices/productsByCategorySlice";
import FilterForm from "../../FiltersForms/FilterForm/FilterForm";
import SaleForm from "../../FiltersForms/SaleForm/SaleForm";
import SortForm from "../../FiltersForms/SortForm/SortForm";
import ProductCard from "../ProductCard/ProductCard";

function ProductsByCategory() {

  const { id } = useParams(); // Извлекаем id из URL
  const dispatch = useDispatch();

  useEffect(() => {
    console.log(id); // Добавьте это для проверки
    if (id) {
      dispatch(fetchProductsOfCategory({ id }));
    }
  }, [id, dispatch]);
  

  let  productsOfCategory  = useSelector((state) => state.productsOfCategory.productsByCategory.data);
  console.log(productsOfCategory);

  // if (!productsOfCategory || !productsOfCategory.data) {
  //   return <div>Loading...</div>;
  // }

  // let categoryProducts = productsOfCategory.data;
  return (
    <main className={s.productsMain}>
      <div className={s.navWrapper}>
        <Link className={s.links} to="/">
          Main page
        </Link>
        <div className={s.line}></div>
        <Link className={s.links} to="/categories">
          Categories
        </Link>
        <div className={s.line}></div>
        {/* <Link id={s.activeLink}>{productsOfCategory.category.title}</Link> */}
      </div>
      {/* <h4 className={s.title}>{productsOfCategory.category.title}</h4> */}
      <div style={{ display: "flex", marginBottom: "50px" }}>
        <FilterForm />
        <SaleForm />
        <SortForm arrayOfProducts={productsOfCategory} />
      </div>
      <ul className={s.productWrapper}>
        {productsOfCategory
         ?.filter((el) => el.showProduct && el.showProductFilter)
        .map((product) => {
          return (
            <ProductCard
              key={product.id}
              {...product}
              categorytitle={productsOfCategory.title}
            />
          );
        })}
      </ul>
    </main>
  );
}
export default ProductsByCategory;
