import React from 'react';

export function composeEvents<E = Element>(...handlers: React.ChangeEventHandler<E>[]) {
  return function eventHandler(ev: React.ChangeEvent<E>) {
    if (ev.defaultPrevented) return;

    handlers.filter(Boolean).forEach(function (handler) {
      handler(ev);
    });
  };
}
