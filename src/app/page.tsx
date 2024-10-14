"use client";
import { useState, useRef } from "react";
import { useAction } from "convex/react";
import { api } from "../../convex/_generated/api";
import Info from "../components/Info";
import Payment from "@/components/Payment";
import Button from "@/components/Button";
import FAQ from "@/components/FAQ";
import FetchForm from "@/components/FetchForm";

interface Idea {
  title: string;
  description: string;
}

export default function Home() {
  const formRef = useRef<HTMLDivElement>(null);

  const scrollToForm = () => {
    if (formRef.current) {
      formRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <main>
      <FetchForm />
      <Info />
      <Payment />
      <Button scrollToForm={scrollToForm} />
      <FAQ />
    </main>
  );
}
