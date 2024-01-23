import s from "./ProductInCart.module.css";
import { useState } from "react";
import deleteIcon from "../../../assets/images/basket/x.svg";

function ProductInCart({
  productInCart,
  deletHandler,
  plusHandler,
  minusHandler,
}) {
  const url = "http://localhost:3333";
  const [quantity, setQantity] = useState(productInCart.quantity);

  const prodMinusHandler = (id) => {
    if (quantity > 1) {
      minusHandler(id);
      setQantity(quantity - 1);
    }
  };
  const prodPlusHandler = (id) => {
    plusHandler(id);
    setQantity(quantity + 1);
  };

  return (
    <div className={s.productsInCart}>
      <img
        src={url + productInCart.image}
        className={s.productsInCartImg}
        alt="product-image"
      />
      <div className={s.productInfo}>
        <h5>{productInCart.title}</h5>
        <div className={s.propertyList}>
          <div className={s.productCounter}>
            <button onClick={() => prodMinusHandler(productInCart.id)}>
              -
            </button>
            <p>{quantity}</p>
            <button onClick={() => prodPlusHandler(productInCart.id)}>+</button>
          </div>
          <div className={s.priceBlock}>
            <p className={s.discountPrice}>
              $
              {(
                productInCart.discont_price * quantity ||
                productInCart.price * quantity
              ).toFixed(2)}
            </p>
            {productInCart.discont_price ? (
              <p className={s.price}>
                ${(productInCart.price * quantity).toFixed(2)}
              </p>
            ) : null}
          </div>
        </div>
      </div>
      <img
        className={s.deleteIcon}
        src={deleteIcon}
        alt="X"
        onClick={() => deletHandler(productInCart.id)}
      />
    </div>
  );
}
export default ProductInCart;
