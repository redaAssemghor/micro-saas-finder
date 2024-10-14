import { configureStore } from "@reduxjs/toolkit";
import { ideasSlice } from "./features/ideasSlice";
import { nicheSlice } from "./features/nicheSlice";

export const store = configureStore({
  reducer: {
    ideas: ideasSlice.reducer,
    niche: nicheSlice.reducer,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
