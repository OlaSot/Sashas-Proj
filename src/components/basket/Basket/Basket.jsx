import s from "./Basket.module.css";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  nameValidation,
  phoneValidation,
  emailValidation,
} from "../../../utils/validations.js";
import { createOrder } from "../Cart/createOrder.js";
import { postOrder } from "../../../store/slices/postOrderSlice.js";
import {
  deleteFromCart,
  plus,
  minus,
  eraser,
} from "../../../store/slices/basketSlice.js";
import ModalWindow from "../ModalWindow/ModalWindow.jsx";
import ProductInCart from "../ProductsInCart/ProductInCart.jsx";

function Basket() {
  const navigate = useNavigate();
  const productsInCart = useSelector(
    (state) => state.productsBasket.productsBasket
  );
  const productsCount = useSelector(
    (state) => state.productsBasket.productsBasket.length
  );
  const dispatch = useDispatch();
  const deletHandler = (productId) => {
    dispatch(deleteFromCart({ id: productId }));
  };
  const plusHandler = (productId) => {
    dispatch(plus({ id: productId }));
  };
  const minusHandler = (productId) => {
    dispatch(minus({ id: productId }));
  };
  let [marker, setMarker] = useState(false);

  function showModalWindow() {
    marker = setMarker(true);
    setTimeout(() => {
      marker = setMarker(false);
    }, "2500");
  }

  function closeModalWindow() {
    marker = setMarker(false);
  }

  function getOrder(data) {
    showModalWindow(marker);
    createOrder(data);
    dispatch(postOrder());
    dispatch(eraser());
    reset();
  }
  let totalSum = productsInCart
    .reduce((acc, el) => {
      return acc + (el.discont_price * el.quantity || el.price * el.quantity);
    }, 0)
    .toFixed(2);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({ mode: "all" });

  return (
    <div className={s.main}>
      <div className={s.titleWrapper}>
        <h4>Shopping cart</h4>
        <div className={s.line}></div>
        <button onClick={() => navigate(-1)}>Back to the store</button>
      </div>
      {productsInCart.length === 0 ? (
        <div className={s.emptyCart}>
          <h5 className={s.message}>
            Looks like you have no items in your basket currently.
          </h5>
          <button onClick={() => navigate("/products")}>
            Continue Shopping
          </button>
        </div>
      ) : (
        <div className={s.cart}>
          <div className={s.products}>
            {productsInCart.map((productInCart) => {
              return (
                <ProductInCart
                  key={productInCart.id}
                  productInCart={productInCart}
                  deletHandler={deletHandler}
                  plusHandler={plusHandler}
                  minusHandler={minusHandler}
                />
              );
            })}
          </div>
          <div className={s.orderDetails}>
            <h5>Order details</h5>
            <p>
              {productsCount} {productsCount === 1 ? "item" : "items"}
            </p>
            <div className={s.totalCost}>
              <p>Total</p>
              <p id={s.totalPrice}>${totalSum}</p>
            </div>
            <form onSubmit={handleSubmit(getOrder)} className={s.formWrapper}>
              <input
                type="text"
                placeholder="Name"
                {...register("name", nameValidation)}
              />
              {errors.name && (
                <p
                  style={{
                    color: "#02393e",
                    fontSize: "16px",
                    marginTop: "5px",
                  }}
                >
                  {errors.name.message}
                </p>
              )}
              <input
                type="text"
                placeholder="Phone Number"
                {...register("phone", phoneValidation)}
              />
              {errors.phone && (
                <p
                  style={{
                    color: "#02393e",
                    fontSize: "16px",
                    marginTop: "5px",
                  }}
                >
                  {errors.phone.message}
                </p>
              )}
              <input
                type="text"
                placeholder="Email"
                {...register("email", emailValidation)}
              />
              {errors.email && (
                <p
                  style={{
                    color: "#02393e",
                    fontSize: "16px",
                    marginTop: "5px",
                  }}
                >
                  {errors.email.message}
                </p>
              )}
              <button type="submit">Order</button>
            </form>
          </div>
        </div>
      )}
      {marker !== false ? <ModalWindow close={closeModalWindow} /> : null}
    </div>
  );
}
export default Basket;
