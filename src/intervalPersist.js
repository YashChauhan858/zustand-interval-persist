import { createStore } from "https://esm.sh/zustand/vanilla";
import { validOptionKeys } from "./constant/options.js";
import { giveValidOptions, isValidObject } from "./utils/helper.js";
function intervalSave(config, options = undefined) {
  // this throws error if invalid options are provided
  if (!isValidObject(options, validOptionKeys))
    throw new Error("Invalid options provided");

  // this gives default options in case any required option is not provided
  const middlewareOptions = giveValidOptions(options);

  return (set, get, api) => {
    function saveState(state) {
      if (!middlewareOptions.enable) return;
      if (middlewareOptions.storage && middlewareOptions.name) {
        middlewareOptions.storage.setItem(
          middlewareOptions.name,
          JSON.stringify(state)
        );
      }
    }

    // Set up interval saving
    let intervalId = setInterval(() => {
      saveState(get());
    }, middlewareOptions?.intervalMs);

    // Load initial state if available
    if (middlewareOptions.storage && middlewareOptions.name) {
      const savedState = middlewareOptions.storage.getItem(
        middlewareOptions.name
      );
      if (savedState) {
        set(JSON.parse(savedState), true);
      }
    }

    // Extend api with methods to control saving

    // stop interval
    api.stopIntervalSave = () => {
      if (intervalId) {
        clearInterval(intervalId);
        intervalId = null;
      }
    };

    // start interval
    api.startIntervalSave = () => {
      api.stopIntervalSave();
      intervalId = setInterval(
        () => saveState(get()),
        middlewareOptions?.intervalMs
      );
    };

    // save immediately
    api.saveNow = () => saveState(get());

    // stop interval save when window is not visible or tab is not active

    if (!document) throw new Error("Document is not available");

    document?.addEventListener("visibilitychange", () => {
      if (document.hidden) {
        api.stopIntervalSave();
      } else {
        api.startIntervalSave();
      }
    });

    const store = config(
      (...args) => {
        set(...args);
        // Optionally save immediately on state change
        if (middlewareOptions?.saveOnChange) {
          saveState(get());
        }
      },
      get,
      api
    );

    return store;
  };
}

function storeOnInterval(storeCreator, options) {
  const middleware = intervalSave(storeCreator, options);
  // It returns a function that expects middleware as its argument
  const store = createStore();
  return store(middleware);
}

export { storeOnInterval };
