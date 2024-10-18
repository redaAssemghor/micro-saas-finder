import { createSlice } from "@reduxjs/toolkit";

interface IdeaState {
  value: string;
}

const initialState: IdeaState = {
  value: "",
};

// Add 'export' here
export const singleIdeaSlice = createSlice({
  name: "idea",
  initialState,
  reducers: {
    addIdea: (state, action) => {
      state.value = action.payload;
    },
  },
});

export const { addIdea } = singleIdeaSlice.actions;
export default singleIdeaSlice.reducer;
