import React, { useState } from "react";
import s from "./ProductCard.module.css";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { fetchSingleProduct } from "../../../store/slices/singlProductSlice";
import { addToCart } from "../../../store/slices/basketSlice";

function ProductCard(el) {
  const url = "http://localhost:3333";
  const discountValue = Math.floor(100 - (el.discont_price * 100) / el.price);
  const dispatch = useDispatch();
  function goToSingleProduct() {
    dispatch(fetchSingleProduct({ id: el.id }));
  }
  const [addedToCart, setAddedToCart] = useState(false);

  const addHandler = (el) => {
    dispatch(addToCart(el));
    setAddedToCart(true);
  };

  return (
    <li className={s.productCard} key={el.id}>
      <Link to={`/products/${el.id}`}>
        <img
          src={!el.id ? el.image : url + el.image}
          className={s.productImg}
          onClick={() => goToSingleProduct(el.id)}
        />
      </Link>
      <div className={s.productDescription}>
        <Link to={`/products/${el.id}`}>
          <span
            className={s.productTitle}
            onClick={() => goToSingleProduct(el.id)}
          >
            {el.title}
          </span>
        </Link>
        <div className={s.priceWrapper}>
          <p className={s.discountPrice}>${el.discont_price || el.price}</p>
          {el.discont_price ? <p className={s.price}>${el.price}</p> : null}
        </div>
        {el.discont_price ? (
          <p className={s.discount}>-{discountValue}%</p>
        ) : null}
      </div>
      <button
        className={`${s.addToCartBtn} ${addedToCart ? s.added : ""}`}
        onClick={() => addHandler(el)}
        disabled={addedToCart}
      >
        {addedToCart ? "Added" : "Add to cart"}
      </button>
    </li>
  );
}
export default ProductCard;
