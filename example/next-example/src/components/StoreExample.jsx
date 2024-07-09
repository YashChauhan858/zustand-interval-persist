"use client";

import useStore from "@/app/store";
import { useEffect } from "react";

const StoreExample = () => {
  const counter = useStore((state) => state.counter);
  const increment = useStore((state) => state.increment);
  const updateRandom = useStore((state) => state.updateRandom);

  useEffect(() => {
    useStore.rehydrate();
  }, []);

  useEffect(() => {
    let id = setInterval(() => {
      updateRandom();
    }, 1000);

    return () => {
      clearInterval(id);
    };
  }, []);

  return (
    <>
      <div className="card">
        <button onClick={increment}>count is {counter}</button>
      </div>
    </>
  );
};

export default StoreExample;
