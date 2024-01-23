import s from "./Category.module.css";
import { useDispatch } from "react-redux";
import { fetchProductsOfCategory } from "../../../../store/slices/productsByCategorySlice";
import { Link } from "react-router-dom";

function CategoryCard({ id, title, image }) {
  const url = "http://localhost:3333";

  const dispatch = useDispatch();
  function goToCategoryProducts() {
    dispatch(fetchProductsOfCategory({ id }));
  }

  return (
    <li className={s.categoryCard}>
      <Link to={`/categories/${id}`}>
        <img
          src={url + image}
          className={s.categoryImg}
          alt="Categiry-image"
          onClick={() => goToCategoryProducts(id)}
        />
      </Link>
      <Link to={`/categories/${id}`}>
        <span
          className={s.categoryTitle}
          onClick={() => goToCategoryProducts(id)}
        >
          {title}
        </span>
      </Link>
    </li>
  );
}
export default CategoryCard;
