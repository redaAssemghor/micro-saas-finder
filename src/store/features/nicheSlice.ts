import { createSlice } from "@reduxjs/toolkit";

interface NicheState {
  value: string;
}

const initialState: NicheState = {
  value: "NicheState",
};

export const nicheSlice = createSlice({
  name: "niche",
  initialState,
  reducers: {
    setNiche: (state, action) => {
      state.value = action.payload;
    },
  },
});

export const { setNiche } = nicheSlice.actions;
export default nicheSlice.reducer;
