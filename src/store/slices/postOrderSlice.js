import { order } from "../../components/basket/Cart/createOrder";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const url = "http://localhost:3333/order/send";
const initialState = {
  order: null,
  status: null,
  error: null,
};
export const postOrder = createAsyncThunk(
  "order/postOrder",
  async (_, { rejectWithValue }) => {
    if (initialState !== null) {
      try {
        const response = await fetch(url, {
          method: "POST",
          body: JSON.stringify(order),
          headers: {
            "Content-type": "application/json; charset=utf-8",
          },
        });
        if (!response.ok) {
          throw new Error("Server Error!");
        }
        const data = await response.json();
        return data;
      } catch (error) {
        return rejectWithValue(error.message);
      }
    }
  }
);

export const postOrderSlice = createSlice({
  name: "order",
  initialState,
  reducers: {},

  extraReducers: (builder) => {
    builder
      .addCase(postOrder.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(postOrder.fulfilled, (state, action) => {
        state.status = "fulfilled";
        state.postOrderSlice = action.payload;
      })
      .addCase(postOrder.rejected, (state, action) => {
        state.status = "error";
        state.error = action.payload;
      });
  },
});

export default postOrderSlice.reducer;
