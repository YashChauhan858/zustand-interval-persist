import { create } from "../src/intervalPersist.js";

const useStore = create(
  (set) => ({
    count: 0,
    increment: (myState) => {
      set((state) => ({ count: myState }));
    },
  }),
  {
    namee: "my-store",
    storage: localStorage,
    intervalMs: 5000, // Save every 5 seconds
    saveOnChange: false, // Optional: also save immediately on each change
  }
);

setInterval(() => {
  useStore.getState().increment(Math.random());
}, 100);
