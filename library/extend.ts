export const extendMethod = <T extends object, K extends keyof OnlyMethods<T>>(prototype: T, key: K, method: T[K]) => {
  const preview = prototype[key];

  if (typeof method != 'function') return;

  prototype[key] = (
    function (this: T, ...args: any[]) {
      method.call(this, ...args);
      if (typeof preview != 'function') return;
      preview.call(this, ...args);
    }
  ) as any as T[K];
};
