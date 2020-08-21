import React, { useEffect, useContext, useRef } from 'react';

import { SlotFillContext } from '../Provider';

export interface SlotProps {
  children?: React.ReactChildren | null;
  name: string;
}

export const Slot: React.FunctionComponent<SlotProps> = ({
  name,
  children,
  ...rest
}) => {
  const slotIndexRef = useRef<any>(null);
  const { debug, subscribe, unsubscribe, getFillForSlot } = useContext(
    SlotFillContext
  );

  useEffect(() => {
    subscribe(name, (slotIdx: number) => {
      debug &&
        console.warn(
          `Slot: Calling suscribe for slotIndex ${slotIdx}, where name is ${name}`
        );

      slotIndexRef.current = slotIdx;
    });

    return function willUnmount() {
      if (slotIndexRef.current) {
        unsubscribe(name, slotIndexRef.current);
      }
    };
  }, [name]);

  if (!name) {
    debug && console.warn(`Slot: You forget to pass id to <Slot>`);
    return null;
  }

  const renderCallback = getFillForSlot(name);
  const child = renderCallback();

  return child ? React.cloneElement(child, rest) : null;
};

Slot.displayName = 'Slot';

export default Slot;
