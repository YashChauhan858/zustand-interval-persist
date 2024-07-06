export const validOptionKeys = [
  "name",
  "storage",
  "intervalMs",
  "saveOnChange",
  "enable",
];

export const defaultOptions = {
  name: "zustand-store",
  storage: localStorage,
  intervalMs: 10_000,
  saveOnChange: true,
  enable: true,
};
