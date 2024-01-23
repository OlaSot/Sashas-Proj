import { Link } from "react-router-dom";
import s from "./Categories.module.css";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getAllCategories } from "../../../../store/slices/categoriesSlice";
import CategoryCard from "../../../categories/CategoryCard";

function Categories() {
  const categories = useSelector((state) => state.categories.categories);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getAllCategories());
  }, [dispatch]);
  return (
    <>
      <div className={s.navWrapper}>
        <Link className={s.links} to="/">
          Main page
        </Link>
        <div className={s.greyLine}></div>
        <Link id={s.currentLink} to="/categories">
          Categories
        </Link>
      </div>
      <h4 className={s.title}>Categories</h4>
      <ul className={s.categoryWrapper}>
        {categories.map((category) => (
          <CategoryCard key={category.id} {...category} />
        ))}
      </ul>
    </>
  );
}
export default Categories;
