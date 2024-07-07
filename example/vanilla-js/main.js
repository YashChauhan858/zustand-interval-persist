import useStore from "./store";

window.onload = () => {
  setTimeout(() => {
    const counter = document.getElementById("counter");
    counter.innerHTML = useStore.getState().counter;
  }, 100);
};

document.getElementById("getLatestValue").addEventListener("click", () => {
  const counter = document.getElementById("counter");
  counter.innerHTML = useStore.getState().counter;
});

setInterval(() => {
  // store value gets updated every 100ms but storage gets updated every 5seconds
  useStore.getState().updateRandom(Math.random());
}, 100);
