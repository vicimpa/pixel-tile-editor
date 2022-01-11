import { Component } from "react";

import { bind } from "./bind";
import { extendMethod } from "./extend";

type TBase = typeof Component;
type TDesc<T> = TypedPropertyDescriptor<T>;
type TEventDecorator = <B extends TBase, F extends Function>(
  target: B['prototype'],
  key: string,
  descriptor: TDesc<F>
) => TDesc<F> | undefined;

function event<T extends keyof DocumentEventMap>(event: T, eventTarget: Document): TEventDecorator;
function event<T extends keyof WindowEventMap>(event: T, eventTarget?: Window): TEventDecorator;
function event<T extends keyof WindowEventMap>(event: T, eventTarget: Window | Document = window): TEventDecorator {
  return <B extends TBase, F extends Function>(target: B['prototype'], key: string, descriptor: TDesc<F>) => {
    extendMethod(
      target as InstanceType<B>,
      'componentDidMount',
      function (this: any) {
        eventTarget.addEventListener(event, this[key]);
      }
    );

    extendMethod(
      target as InstanceType<B>,
      'componentWillUnmount',
      function (this: any) {
        eventTarget.removeEventListener(event, this[key]);
      }
    );

    return bind()(target, key, descriptor);
  };
}

export { event };