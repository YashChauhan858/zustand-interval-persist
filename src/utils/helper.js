import { defaultOptions } from "../constant/options.js";

/**
 * Checks if the given object is valid based on the provided keys array.
 */
export const isValidObject = (object, keysArray) => {
  if (!object) return false;
  if (!keysArray || keysArray.length === 0) return true;
  return Object.keys(object).every((key) => keysArray.includes(key));
};

/**
 * Merges user-provided options with default options to ensure all necessary settings are defined.
 * If a specific option is not provided by the user, the corresponding default value is used.
 * This function is useful for initializing configurations with optional settings.
 */
export const giveValidOptions = (options) => {
  if (!options) return defaultOptions;
  const validOptions = {};
  if (!options?.name) {
    validOptions.name = defaultOptions.name;
  }
  if (!options?.storage) {
    validOptions.storage = defaultOptions.storage;
  }
  if (!options?.saveOnChange) {
    validOptions.saveOnChange = defaultOptions.saveOnChange;
  }
  if (!options?.intervalMs) {
    validOptions.intervalMs = defaultOptions.intervalMs;
  }
  if (!options?.enable) {
    validOptions.enable = defaultOptions.enable;
  }
  return { ...validOptions, ...options };
};

/**
 * Saves the current state to the specified storage.
 * @param {Object} state The current state of the store.
 */
export const saveState = (state, middlewareOptions) => {
  if (middlewareOptions.storage && middlewareOptions.name) {
    middlewareOptions.storage.setItem(
      middlewareOptions.name,
      JSON.stringify(state)
    );
  }
};

/**
 * Attaches an event listener to the document to start or stop interval saving based on window visibility.
 *
 * @param {Function} stopIntervalSave - Function to call to stop the interval saving.
 * @param {Function} startIntervalSave - Function to call to start the interval saving.
 * @param {Object} middlewareOptions - Configuration options for the middleware.
 * @param {boolean} [middlewareOptions.enable] - Flag to enable or disable the functionality. If not provided or false, the function will exit early.
 */
export const handleIntervalOnWindowVisibility = (
  stopIntervalSave,
  startIntervalSave,
  middlewareOptions
) => {
  if (
    typeof document === "undefined" ||
    !document ||
    !middlewareOptions?.enable
  )
    return;
  document?.addEventListener?.("visibilitychange", () => {
    if (document.hidden) {
      stopIntervalSave();
    } else {
      startIntervalSave();
    }
  });
};
