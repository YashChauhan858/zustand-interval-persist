import { create } from "zustand";
import { validOptionKeys } from "./constant/options.js";
import {
  giveValidOptions,
  handleIntervalOnWindowVisibility,
  isValidObject,
  saveState,
} from "./utils/helper.js";

function intervalSave(config, options = undefined) {
  // Throws error if invalid options are provided
  if (!isValidObject(options, validOptionKeys))
    throw new Error("Invalid options provided");

  // this gives default options in case any required option is not provided
  const middlewareOptions = giveValidOptions(options);

  return (set, get, api) => {
    let intervalId = null;

    // Set up interval saving
    if (middlewareOptions.enable) {
      intervalId = setInterval(() => {
        saveState(get(), middlewareOptions);
      }, middlewareOptions?.intervalMs);
    }

    /**
     * Hydrate initial state if available and opted by user
     * by setting hydrateOnLoad option to true
     */
    if (
      middlewareOptions.hydrateOnLoad &&
      middlewareOptions.storage &&
      middlewareOptions.name
    ) {
      const savedState = middlewareOptions.storage.getItem(
        middlewareOptions.name
      );
      if (!!savedState && savedState !== "undefined") {
        setTimeout(() => {
          set(JSON.parse(savedState));
        }, 0);
      }
    }

    // Extend api with methods to control saving

    /**
     * Rehydrates the store state from the storage.
     * will work only when hydrateOnLoad is set to false
     */
    api.rehydrate = () => {
      if (middlewareOptions.hydrateOnLoad) return;
      const data = middlewareOptions.storage.getItem(middlewareOptions.name);
      if (!data) return null;
      set(JSON.parse(data));
    };

    /**
     * Stops the automatic interval saving.
     */
    api.stopIntervalSave = () => {
      if (!middlewareOptions.enable) return;
      if (intervalId) {
        clearInterval(intervalId);
        intervalId = null;
      }
    };

    /**
     * Starts the automatic interval saving.
     */
    api.startIntervalSave = () => {
      if (!middlewareOptions.enable) return;
      api.stopIntervalSave();
      intervalId = setInterval(() => {
        saveState(get(), middlewareOptions);
      }, middlewareOptions?.intervalMs);
    };

    /**
     * Saves the current state immediately.
     */
    api.saveNow = () => saveState(get(), middlewareOptions);

    /**
     * Stops the automatic interval saving when the tab is hidden
     * and starts when window is visible
     */
    handleIntervalOnWindowVisibility(
      api.stopIntervalSave,
      api.startIntervalSave,
      middlewareOptions
    );

    const store = config(
      (...args) => {
        set(...args);
        // Optionally save immediately on state change
        if (middlewareOptions?.saveOnChange) {
          saveState(get(), middlewareOptions);
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
  const store = create();
  return store(middleware);
}

export { storeOnInterval };
