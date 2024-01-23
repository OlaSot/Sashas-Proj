import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
const url = "http://localhost:3333/products/all";
const initialState = {
  products: [],
  status: null,
  error: null,
};

export const getAllProducts = createAsyncThunk(
  "products/getAllProducts",
  async (_, { rejectWithValue }) => {
    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error("Could not retrieve data");
      }
      const data = await response.json();
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const allProductsSlice = createSlice({
  name: "products",
  initialState: {
    status: null,
    list: [],
  },

  reducers: {
    sortProducts(state, action) {
      if (action.payload === "low-high") {
        state.list.sort((a, b) => a.price - b.price);
      } else if (action.payload === "high-low") {
        state.list.sort((a, b) => b.price - a.price);
      } else if (action.payload === "titleAsc") {
        state.list.sort((a, b) => a.title.localeCompare(b.title));
      } else if (action.payload === "titleDesc") {
        state.list.sort((a, b) => b.title.localeCompare(a.title));
      } else {
        state.list.sort((a, b) => a.id - b.id);
      }
    },

    filterPrice(state, action) {
      const { minPrice, maxPrice } = action.payload;
      state.list.map((el) => {
        let actualPrice = el.discont_price || el.price;
        if (actualPrice >= minPrice && actualPrice <= maxPrice) {
          el.showProductFilter = true;
        } else {
          el.showProductFilter = false;
        }
        return el;
      });
    },

    discountProducts(state, action) {
      if (action.payload) {
        state.list.map((el) => {
          if (el.discont_price === null) {
            el.showProduct = false;
          }
          return el;
        });
      } else {
        state.list.map((el) => {
          el.showProduct = true;
          return el;
        });
      }
    },
  },

  extraReducers: (builder) =>
    builder
      .addCase(getAllProducts.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(getAllProducts.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.list = action.payloadю.map((el) => ({
          ...el,
          showProduct: true,
          showProductFilter: true,
        }));
      })
      .addCase(getAllProducts.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      }),
});

export const { filterPrice, sortProducts, discountProducts } =
  allProductsSlice.actions;
export default allProductsSlice.reducer;
