import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import loading from "../../assets/images/loading.svg";

const initialState = {
  productsByCategory: {
    // category: {
    //   title: "Loading...",
    // },
    data: [
      // {
      //   id: null,
      //   title: "loading...",
      //   price: " loading...",
      //   discont_price: null,
      //   image: loading,
      // },
    ],
  },
  status: null,
  error: null,
};

export const fetchProductsOfCategory = createAsyncThunk(
  "productsOfCategory/getProductsOfCategory",
  async ({ id }, { rejectWithValue }) => {
    try {
      let response = await fetch(`http://localhost:3333/categories/${id}`);
      if (!response.ok) {
        throw new Error("HTTP-Error");
      }
      const data = await response.json();
      console.log(data);
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const productsByCategorySlice = createSlice({
  name: "productsOfCategory",
  initialState,
  reducers: {
    sort_prods_cat(state, action) {
      if (action.payload === "low-high") {
        state.productsByCategory.data.sort((a, b) => a.price - b.price);
      } else if (action.payload === "high-low") {
        state.productsByCategory.data.sort((a, b) => b.price - a.price);
      } else if (action.payload === "titleAsc") {
        state.productsByCategory.data.sort((a, b) => a.title.localeCompare(b.title));
      } else if (action.payload === "titleDesc") {
        state.productsByCategory.data.sort((a, b) => b.title.localeCompare(a.title));
      } else {
        state.productsByCategory.data.sort((a, b) => a.id - b.id);
      }
    },
    filter_products_cat(state, action) {
        const { minPrice, maxPrice } = action.payload
        state.productsByCategory.data.map(el => {
            let actualPrice = el.discont_price || el.price;
            if (actualPrice >= minPrice && actualPrice <= maxPrice) {
                el.showProductFilter = true;
            } else {
                el.showProductFilter = false;
            }
            return el
        });
    },
    discounted_products_cat(state, action) {

        action.payload

            ? state.productsByCategory.data.map(el => {
                if (!el.discont_price) {
                    el.showProduct = false
                }
                return el
            })
            : state.productsByCategory.data.map(el => {
                el.showProduct = true
                return el
            });
    }

},

  extraReducers: (builder) => {
    builder
      .addCase(fetchProductsOfCategory.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(fetchProductsOfCategory.fulfilled, (state, action) => {
        state.status = 'ready'
        state.list = action.payload
        const { data, category } = action.payload;
        state.productsByCategory.data = data.map(el => ({ ...el, showProduct: true,
          showProductFilter: true, }));
        state.productsByCategory.category = category;
      })
      .addCase(fetchProductsOfCategory.rejected, (state, action) => {
        state.status = "error ";
        state.error = action.payload;
      });
  },
});

export const {sort_prods_cat, discounted_products_cat, filter_products_cat} = productsByCategorySlice.actions
export default productsByCategorySlice.reducer;
