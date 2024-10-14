"use client";
import { store } from "../store/store";
import { Provider } from "react-redux";
import Info from "../components/Info";
import Payment from "@/components/Payment";
import Button from "@/components/Button";
import FAQ from "@/components/FAQ";
import FetchForm from "@/components/FetchForm";
import { useRef } from "react";

export default function Home() {
  const formRef = useRef<HTMLDivElement>(null);

  const scrollToForm = () => {
    if (formRef.current) {
      formRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <main>
      <Provider store={store}>
        <FetchForm />
        <Info />
        <Payment />
        <Button scrollToForm={scrollToForm} />
        <FAQ />
      </Provider>
    </main>
  );
}
