
# zustand-interval-persist

This library is an enhancement for [zustand](https://zustand-demo.pmnd.rs/) that enables automatic saving of the store's state to the specified storage at regular intervals.

Installation
```bash
npm i zustand-interval-persist
```

Import
```js
import { storeOnInterval } from "zustand-interval-persist";
```

Usage
```js
// Creating a store

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

// using in a react.js component

const App = () => {

    const counter = useStore((state) => state.counter);
    const increment = useStore((state) => state.increment);

    useEffect(() => {
        // Simulating frequent update

        let id = setInterval(() => {
            updateRandom();
        }, 1000);

        return () => {
           clearInterval(id);
        };
    }, []);

    ....
    
    return (
        <div className="card">
            <button onClick={increment}>count is {counter}</button>
        </div>
    )
}
```

##### All possible options

- name:  name that will act as a key for storage (default: zustand-store)
- storage:  storage object (default: localstorage)
- intervalMs: number in milliseconds (default: 10_000 aka 10 seconds)
- saveOnChange: triggers save to the given storage (default: false)
- enable: if true data will be persisted to storage (default: true)
- hydrateOnLoad: if true store's state will be hydrated using storage value (default:true)