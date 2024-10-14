"use client";
import { Provider } from "react-redux";
import Results from "./Results";
import { store } from "@/store/store";

const page = () => {
  return (
    <div>
      <Provider store={store}>
        <Results />
      </Provider>
    </div>
  );
};

export default page;
