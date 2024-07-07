export const validOptionKeys = [
  "name",
  "storage",
  "intervalMs",
  "saveOnChange",
  "enable",
  "hydrateOnLoad",
];

export const defaultOptions = {
  name: "zustand-store",
  storage: localStorage,
  intervalMs: 10_000,
  saveOnChange: false,
  enable: true,
  hydrateOnLoad: true,
};
