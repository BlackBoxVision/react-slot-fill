import React, { useState, createContext } from 'react';

export interface SlotFillContextProps {
  setFillForSlot: (slotId: string, renderCallback: () => any) => void;
  subscribe: (slotId: string, renderCallback: () => any) => void;
  unsubscribe: (slotId: string, slotIndex: number) => void;
  getFillForSlot: (slotId: string) => () => any;
  notify: (slotId: string) => any;
  debug: boolean;
}

export interface SlotFillItem {
  slotId: string;
  callback: () => any;
}

export interface SlotFillProviderProps {
  debug?: boolean;
  children?: any;
}

export const SlotFillContext = createContext<any>({} as any);

export const Provider: React.FunctionComponent<SlotFillProviderProps> = ({
  debug,
  children,
}) => {
  const [subscribers, setSubscribers] = useState<SlotFillItem[]>([]);

  const noopRenderCallback = () => {
    debug &&
      console.warn(
        `[SlotAndFillProvider]: NoopRenderCallback has nothing to render`
      );

    return null;
  };

  const setFillForSlot = (
    slotId: string,
    renderCallback = noopRenderCallback
  ) => {
    const fillForSlot = subscribers.find(
      (suscriber: any) => suscriber.slotId === slotId
    );

    if (fillForSlot) {
      debug &&
        console.warn(
          `[SlotAndFillProvider]: You've already registered a Fill for the following slotId: ${slotId}`
        );

      return;
    }

    subscribe(slotId, renderCallback);
    notify(slotId);
  };

  const getFillForSlot = (slotId: string) => {
    const fillById: SlotFillItem | undefined = subscribers.find(
      (suscriber: any) => suscriber.slotId === slotId
    );

    if (!fillById) {
      debug &&
        console.warn(
          `[SlotAndFillProvider]: There's no Fill registered for the following slotId: ${slotId}`
        );

      return noopRenderCallback;
    }

    return fillById.callback;
  };

  const subscribe = (slotId: string, callback: () => any) => {
    debug &&
      console.warn(
        `[SlotAndFillProvider]: Subscribe callback for slotId ${slotId}`
      );

    setSubscribers((suscribers: any) =>
      suscribers.concat({ slotId, callback })
    );
  };

  const unsubscribe = (slotId: string, slotIndex: number) => {
    debug &&
      console.warn(
        `[SlotAndFillProvider]: Unsubscribe callback for slotId ${slotId} and slotIndex ${slotIndex}`
      );

    setSubscribers((suscribers: any) =>
      suscribers.filter(
        (suscriber: any, idx: number) =>
          suscriber.slotId === slotId && idx === slotIndex
      )
    );
  };

  const notify = (slotId: string) => {
    debug &&
      console.warn(
        `[SlotAndFillProvider]: Notify subscribers for slotId ${slotId}`
      );
    debug &&
      console.warn(
        `[SlotAndFillProvider]: Current amount of subscribers is ${subscribers.length}`
      );

    subscribers.forEach((suscriber: any, slotIndex: number) => {
      if (suscriber.slotId !== slotId) {
        debug &&
          console.warn(
            `[SlotAndFillProvider]: Subscriber isn't matching slotId value`
          );

        return;
      }

      suscriber.callback(slotIndex);
    });
  };

  return (
    <SlotFillContext.Provider
      value={{
        debug,
        notify,
        subscribe,
        unsubscribe,
        setFillForSlot,
        getFillForSlot,
      }}
    >
      {children}
    </SlotFillContext.Provider>
  );
};

Provider.displayName = 'SlotFillProvider';

export default Provider;
