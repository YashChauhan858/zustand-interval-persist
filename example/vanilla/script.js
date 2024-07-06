import { storeOnInterval } from "../../src/intervalPersist.js";

const useStore = storeOnInterval(
  (set) => ({
    count: 0,
    update: (myState) => {
      set(() => ({ count: myState }));
    },
  }),
  {
    name: "my-store",
    intervalMs: 5000,
    saveOnChange: false,
  }
);

const counter = document.getElementById("counter");
counter.innerHTML = useStore.getState().count;

document.getElementById("getLatestValue").addEventListener("click", () => {
  const counter = document.getElementById("counter");
  counter.innerHTML = useStore.getState().count;
});

document.getElementById("updateWithHello").addEventListener("click", () => {
  useStore.getState().update("HELLO");
  const counter = document.getElementById("counter");
  counter.innerHTML = useStore.getState().count;
});

setInterval(() => {
  useStore.getState().update(Math.random());
}, 100);
