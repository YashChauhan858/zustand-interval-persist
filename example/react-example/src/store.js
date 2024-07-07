import { storeOnInterval } from "zustand-interval-persist";

const useStore = storeOnInterval(
  (set) => ({
    counter: 0,
    increment: () => {
      set((state) => ({ counter: state.counter + 1 }));
    },
    decrement: () => set((state) => ({ counter: state.counter - 1 })),
    updateRandom: () => set({ counter: Math.random() }),
  }),
  {
    name: "my-store",
    intervalMs: 5000,
    saveOnChange: false,
    hydrateOnLoad: true,
  }
);

export default useStore;
