import { defaultOptions } from "../constant/options.js";

export const isValidObject = (object, keysArray) => {
  if (!object) return false;
  if (!keysArray || keysArray.length === 0) return true;
  return Object.keys(object).every((key) => keysArray.includes(key));
};

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
