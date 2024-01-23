import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import s from "./Main.module.css";
import CategoryList from "./components/categories/CategoryList";
import { useDispatch } from "react-redux";
import { getAllCategories } from "../../store/slices/categoriesSlice";
import { getAllProducts } from "../../store/slices/allProductsSlice";
import GetDiscount from "./components/getDiscount/GetDiscount";
import SaleProductsList from "./components/sale/SaleProductsList";
import { useRef } from "react";

function Main() {
  const saleProductsRef = useRef();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllCategories());
    dispatch(getAllProducts());
  }, [dispatch]);

  return (
    <main className={s.mainContainer}>
      <section className={s.top}>
        <h2 className={s.title}>Amazing Discounts on Garden Products!</h2>
        <button
          className={s.btnCheckOut}
          onClick={() => {
            saleProductsRef.current.scrollIntoView({
              behavior: "smooth",
              block: "start",
            });
          }}
        >
          Check out
        </button>
      </section>
      <CategoryList />
      <GetDiscount />
      <SaleProductsList ref={saleProductsRef} />
    </main>
  );
}
export default Main;
