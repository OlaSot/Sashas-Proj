import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
const initialState = {
  product: [
    {
      title: "Loading...",
    },
  ],
  status: null,
  error: null,
};

export const fetchSingleProduct = createAsyncThunk(
  "singleProduct/fetchSingleProduct",
  async ({ id }, { rejectWithValue }) => {
    try {
      const response = await fetch(`http://localhost:3333/products/${id}`);
      if (!response.ok) {
        throw new Error("Server Error!");
      }
      const data = await response.json();
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const singleProductSlice = createSlice({
  name: "product",
  initialState,
  reducers: {},

  extraReducers: (builder) => {
    builder
      .addCase(fetchSingleProduct.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(fetchSingleProduct.fulfilled, (state, action) => {
        state.status = "fulfilled";
        state.product = action.payload;
      })
      .addCase(fetchSingleProduct.rejected, (state, action) => {
        state.status = "error";
        state.error = action.payload;
      });
  },
});

export default singleProductSlice.reducer;
