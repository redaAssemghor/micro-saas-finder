import { createSlice } from "@reduxjs/toolkit";

type Idea = {
  title: string;
  description: string;
};

interface IdeasState {
  value: Idea[];
}

const initialState: IdeasState = {
  value: [],
};

export const ideasSlice = createSlice({
  name: "ideas",
  initialState,
  reducers: {
    addIdea: (state, action) => {
      state.value.push(action.payload);
    },
    removeIdea: (state, action) => {
      state.value = state.value.filter((idea) => idea !== action.payload);
    },
  },
});

// Action creators are generated for each case reducer function
export const { addIdea, removeIdea } = ideasSlice.actions;

export default ideasSlice.reducer;
