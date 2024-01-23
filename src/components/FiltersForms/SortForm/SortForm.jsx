import s from "../FilterForms.module.css";
import { sortProducts } from "../../../store/slices/allProductsSlice";
import { useDispatch } from "react-redux";
import { sort_prods_cat } from "../../../store/slices/productsByCategorySlice";



function SortForm() {
  const dispatch = useDispatch();
  const sortFunction = (e) => {
    dispatch(sortProducts(e.target.value));
    dispatch(sort_prods_cat(e.target.value));

  };
  return (
    <div className={s.sortForm}>
      <h5 className={s.sorted}>Sorted</h5>
      <select
        onChange={sortFunction}
        className={s.select}
        name="sortedBy"
        id="sortedBy"
      >
        <option value="default">by default</option>
        <option value="low-high">Price (low to high)</option>
        <option value="high-low">Price (high to low)</option>
        <option value="titleAsc">Title (A to Z)</option>
        <option value="titleDesc">Title (Z to A)</option>
      </select>
    </div>
  );
}

export default SortForm;
