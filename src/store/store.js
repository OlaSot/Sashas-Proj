import { configureStore } from "@reduxjs/toolkit";
import categoriesReducer from "./slices/categoriesSlice";
import getDiscountReducer from "./slices/getDiscountSlice";
import productsByCategoryReducer from "./slices/productsByCategorySlice";
import allProductsReducer from "./slices/allProductsSlice";
import singleProductReducer from "./slices/singlProductSlice";
import postOrderReducer from "./slices/postOrderSlice";
import productsBasketReducer from "./slices/basketSlice";

export default configureStore({
  reducer: {
    categories: categoriesReducer,
    discountReceiver: getDiscountReducer,
    products: allProductsReducer,
    productsOfCategory: productsByCategoryReducer,
    product: singleProductReducer,
    order: postOrderReducer,
    productsBasket: productsBasketReducer,
  },
});
