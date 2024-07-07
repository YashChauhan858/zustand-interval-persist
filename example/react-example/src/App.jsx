import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import useStore from "./store";
import { useEffect } from "react";

function App() {
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
      <div>
        <a href="https://vitejs.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={increment}>count is {counter}</button>
        <p>
          Edit <code>src/App.jsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  );
}

export default App;
