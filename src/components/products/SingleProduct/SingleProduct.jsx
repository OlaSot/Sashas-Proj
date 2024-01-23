import s from "./SingleProduct.module.css";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import loading from "../../../assets/images/loading.svg";
import { useState } from "react";
import { fetchProductsOfCategory } from "../../../store/slices/productsByCategorySlice";
import { addToCart } from "../../../store/slices/basketSlice";
import { changeQuantity } from "../../../store/slices/basketSlice";

function SingleProduct() {
  const url = "http://localhost:3333";
  const dispatch = useDispatch();
  function goToCategoryProducts() {
    dispatch(fetchProductsOfCategory({ id: singleProduct.categoryId }));
  }
  const [addedToCart, setAddedToCart] = useState(false);

  const addHandler = (product, quantity) => {
    dispatch(addToCart(product, quantity));
    setAddedToCart(true);
  };
  let singleProduct = useSelector((state) => state.product.product[0]);
  const [quantity, setQantity] = useState(1);
  const minusHandler = () => {
    if (quantity > 1) {
      setQantity(quantity - 1);
      dispatch(changeQuantity(quantity - 1));
    }
  };
  const plusHandler = () => {
    setQantity(quantity + 1);
    dispatch(changeQuantity(quantity + 1));
  };
  const discountValue = Math.floor(
    100 - (singleProduct.discont_price * 100) / singleProduct.price
  );
  let categoryTitle = "";
  switch (singleProduct.categoryId) {
    case 1:
      categoryTitle = "Annuals";
      break;
    case 2:
      categoryTitle = "Nursery";
      break;
    case 3:
      categoryTitle = "Garden Art";
      break;
    case 4:
      categoryTitle = "Plant Care";
      break;
    case 5:
      categoryTitle = "Seasonal";
      break;
    default:
      categoryTitle = "Loading...";
  }
  return (
    <main className={s.main}>
      <div className={s.navWrapper}>
        <Link className={s.links} to="/">
          Main page
        </Link>
        <div className={s.line}></div>
        <Link className={s.links} to="/categories">
          Categories
        </Link>
        <div className={s.line}></div>
        <Link
          className={s.links}
          to={`/categories/${singleProduct.categoryId}`}
          onClick={() => goToCategoryProducts()}
        >
          {" "}
          {categoryTitle}{" "}
        </Link>
        <div className={s.line}></div>
        <Link id={s.activeLink}>{singleProduct.title}</Link>
      </div>
      <div className={s.singleProductWrapper}>
        <img
          className={s.singleProductImage}
          src={!singleProduct.id ? loading : url + singleProduct.image}
          alt="product_photo"
        />
        <div className={s.info}>
          <h4 className={s.title}>{singleProduct.title}</h4>
          <div className={s.priceBlock}>
            <p className={s.discountPrice}>
              $
              {singleProduct.discont_price * quantity ||
                singleProduct.price * quantity}
            </p>
            {singleProduct.discont_price ? (
              <p className={s.price}>${singleProduct.price * quantity}</p>
            ) : null}
            {singleProduct.discont_price ? (
              <p className={s.discount}>-{discountValue}%</p>
            ) : null}
          </div>
          <div className={s.basketSetupBar}>
            <div className={s.quantityBlock}>
              <button onClick={() => minusHandler()}>-</button>
              <p>{quantity}</p>
              <button onClick={() => plusHandler()}>+</button>
            </div>
            <button
              className={`${s.toCartBtn} ${addedToCart ? s.added : ""}`}
              onClick={() => addHandler(singleProduct, quantity)}
              disabled={addedToCart}
            >
              {addedToCart ? "Added" : "Add to cart"}
            </button>
          </div>
          <h5 className={s.description}>Description</h5>
          <p className={s.singleProductDescription}>
            {singleProduct.description}
          </p>
        </div>
      </div>
    </main>
  );
}
export default SingleProduct;
