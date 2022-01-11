/// <reference types="vite/client" />

type OnlyMethods<T extends object> = {
  [K in FilteredKeys<T, Function>]-?: T[K] extends Function ? T[K] : never;
};

type FilteredKeys<T, U> = { [P in keyof T]: T[P] extends U ? P : never }[keyof T];