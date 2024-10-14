import { createSlice } from "@reduxjs/toolkit";

interface NicheState {
  value: string;
}

const initialState: NicheState = {
  value: "",
};

export const nicheSlice = createSlice({
  name: "niche",
  initialState,
  reducers: {
    setNicheSlice: (state, action) => {
      state.value = action.payload;
    },
  },
});

export const { setNicheSlice } = nicheSlice.actions;
export default nicheSlice.reducer;
