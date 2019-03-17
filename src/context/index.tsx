import React from 'react';

const noopRenderCallback = () => {
  console.warn(`SlotAndFillManager: NoopRenderCallback has nothing to render`);
  return false;
};

export class SlotFillManager {
  slotsAndFills = new Map();
  subscribers = [];

  setFillForSlot = (slotId, renderCallback = noopRenderCallback) => {
    const fillForSlot = this.slotsAndFills.get(slotId);

    if (fillForSlot) {
      console.warn(
        `SlotAndFillManager: You've already registered a Fill for the following slotId: ${slotId}`
      );
      return;
    }

    this.slotsAndFills.set(slotId, renderCallback);
    this.notify(slotId);
  };

  getFillForSlot = slotId => {
    const fillById = this.slotsAndFills.get(slotId);

    if (!fillById) {
      console.warn(
        `SlotAndFillManager: There's no Fill registered for the following slotId: ${slotId}`
      );
      return noopRenderCallback;
    }

    return fillById;
  };

  subscribe = (slotId, callback) => {
    console.warn(`SlotAndFillManager: Subscribe callback for slotId ${slotId}`);
    this.subscribers.push({ slotId, callback });
  };

  unsubscribe = (slotId, slotIndex) => {
    console.warn(
      `SlotAndFillManager: Unsubscribe callback for slotId ${slotId} and slotIndex ${slotIndex}`
    );
    this.subscribers = this.subscribers.filter(
      (subscriber, index) => subscriber.slotId === slotId && index === slotIndex
    );
  };

  notify = slotId => {
    console.warn(`SlotAndFillManager: Notify subscribers for slotId ${slotId}`);
    console.warn(
      `SlotAndFillManager: Current amount of subscribers is ${
        this.subscribers.length
      }`
    );

    this.subscribers.forEach((subscriber, index) => {
      if (subscriber.slotId !== slotId) {
        console.warn(
          `SlotAndFillManager: Subscriber isn't matching slotId value`
        );
        return;
      }

      subscriber.callback(index);
    });
  };
}

export const SlotFillContext = React.createContext(null);

export const withContext = Component => {
  const WrappedComponent = props => (
    <SlotFillContext.Consumer>
      {ctx => <Component {...props} ctx={ctx} />}
    </SlotFillContext.Consumer>
  );

  WrappedComponent.displayName = Component.displayName || Component.name;

  return WrappedComponent;
};

export interface SlotFillContextProps {
  slotsAndFills: Map<any, any>;
  suscribers: Array<any>;
  setFillForSlot: Function;
  getFillForSlot: Function;
  unsubscribe: Function;
  subscribe: Function;
  notify: Function;
}
