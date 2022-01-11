import { Base } from "./base";

type TBase = typeof Base;

const bindedSymbol = Symbol('binded');
const getBindedSet = <B extends TBase>(
  target: B['prototype'] & {
    [bindedSymbol]?: Set<string>;
  }
) => {
  return target[bindedSymbol] ?? (
    target[bindedSymbol] = new Set()
  );
};

export const bind = (obj?: any) => {
  return (
    <
      B extends TBase,
      F extends Function
    >(
      target: B['prototype'],
      key: string,
      descriptor: TypedPropertyDescriptor<F>
    ): TypedPropertyDescriptor<F> | undefined => {
      const { value } = descriptor;
      const keySymbol = Symbol(key);
      const binded = getBindedSet(target);

      if (typeof value !== 'function')
        return;

      if (binded.has(key))
        return;

      binded.add(key);

      return {
        get(this: any) {
          return this[keySymbol] ?? (
            this[keySymbol] = value.bind(obj ?? this)
          );
        }
      };
    }
  );
};